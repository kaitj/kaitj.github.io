# /// script
# dependencies = [
#  "aiohttp>=3.14.1",
#  "polars>=1.42.1",
#  "python-dateutil>=2.9.0.post0",
# ]
# requires-python = ">=3.12"
# ///

"""Get details of relevant publications found on Semantic Scholar."""

import asyncio
import json
import logging
import os
import sys
from pathlib import Path
from typing import Any, NamedTuple

import aiohttp
import polars as pl
from dateutil import parser

logger = logging.getLogger(__name__)

API_BASE = "https://api.semanticscholar.org/graph/v1"
API_KEY = os.environ.get("S2_API_KEY", "")

# Semantic Scholar author ID
# https://www.semanticscholar.org/author/name-.../<AUTHOR_ID>
AUTHOR_ID = "81968226"
MIN_YEAR = 2015

PAGE_LIMIT = 100
MAX_CONCURRENT_REQUESTS = 5
MAX_RETRIES = 5

SKIP_PAPER_IDS: frozenset[str] = frozenset()
ACCEPTABLE_FORMATS: frozenset[str] = frozenset({"journalarticle", "study", "editorial"})
PAPER_FIELDS = ",".join(
    [
        "paperId",
        "externalIds",
        "title",
        "authors.name",
        "year",
        "publicationDate",
        "venue",
        "journal",
        "publicationTypes",
    ]
)

PUBLICATION_SCHEMA: dict[str, pl.DataType] = {
    "paperid": pl.Utf8,
    "doi": pl.Utf8,
    "title": pl.Utf8,
    "authors": pl.List(pl.Utf8),
    "year": pl.Int32,
    "month": pl.Int32,
    "day": pl.Int32,
    "journal": pl.Utf8,
    "volume": pl.Utf8,
    "issue": pl.Utf8,
    "pages": pl.Utf8,
}


class Publication(NamedTuple):
    """A single filtered, typed publication record.

    Attributes:
        paperid: The Semantic Scholar paper ID.
        doi: The publication's DOI, or an empty string if unavailable.
        title: The publication title, with any trailing period stripped.
        authors: Author names in the order returned by Semantic Scholar.
        year: Publication year.
        month: Publication month (defaults to 1 if not reported).
        day: Publication day (defaults to 1 if not reported).
        journal: Journal or venue name.
        volume: Journal volume, or an empty string if unavailable.
        issue: Journal issue number, or an empty string if unavailable.
        pages: Page range, or an empty string if unavailable.
    """

    paperid: str
    doi: str
    title: str
    authors: list[str]
    year: int
    month: int
    day: int
    journal: str
    volume: str
    issue: str
    pages: str


def _headers() -> dict[str, str]:
    """Build request headers, attaching the API key if one is configured.

    Returns:
        A headers dict containing an ``x-api-key`` entry when ``API_KEY``
        is set, or an empty dict otherwise.
    """
    return {"x-api-key": API_KEY} if API_KEY else {}


async def _get_with_retry(
    session: aiohttp.ClientSession, url: str, params: dict[str, Any]
) -> dict[str, Any]:
    """GET a Semantic Scholar endpoint, retrying with backoff on rate limits.

    Args:
        session: The aiohttp session to issue the request with.
        url: The endpoint URL to fetch.
        params: Query parameters to send with the request.

    Returns:
        The parsed JSON response body.

    Raises:
        RuntimeError: If the request is still rate-limited after
            ``MAX_RETRIES`` attempts.
        aiohttp.ClientResponseError: If the response is an unrecoverable
            HTTP error.
    """
    for attempt in range(MAX_RETRIES):
        async with session.get(url, params=params) as response:
            if response.status == 429:
                wait = 2**attempt
                logger.warning("Rate limited, retrying in %%s...", wait)
                await asyncio.sleep(wait)
                continue
            response.raise_for_status()
            return await response.json()
    raise RuntimeError(f"Exceeded retries fetching {url}")


async def fetch_author_papers(
    session: aiohttp.ClientSession, author_id: str
) -> list[dict[str, Any]]:
    """Fetch all papers for an author ID, paginating pages concurrently.

    The first page is fetched to determine the total result count, then
    any remaining pages are fetched concurrently (bounded by
    ``MAX_CONCURRENT_REQUESTS``) to reduce overall latency.

    Args:
        session: The aiohttp session to issue requests with.
        author_id: The Semantic Scholar author ID to fetch papers for.

    Returns:
        A list of raw paper records, as returned by the Semantic Scholar
        API, for the given author.
    """
    url = f"{API_BASE}/author/{author_id}/papers"
    base_params = {"fields": PAPER_FIELDS, "limit": PAGE_LIMIT}

    first_page = await _get_with_retry(session, url, {**base_params, "offset": 0})
    papers: list[dict[str, Any]] = first_page.get("data", [])
    total: int = first_page.get("total", len(papers))

    remaining_offsets = range(PAGE_LIMIT, total, PAGE_LIMIT)
    if remaining_offsets:
        semaphore = asyncio.Semaphore(MAX_CONCURRENT_REQUESTS)

        async def fetch_page(offset: int) -> list[dict[str, Any]]:
            """Fetch a single page of results at the given offset.

            Args:
                offset: The pagination offset to request.

            Returns:
                The list of paper records on that page.
            """
            async with semaphore:
                page = await _get_with_retry(
                    session, url, {**base_params, "offset": offset}
                )
                return page.get("data", [])

        pages = await asyncio.gather(*(fetch_page(o) for o in remaining_offsets))
        for page in pages:
            papers.extend(page)

    logger.info(f"Fetched {len(papers)} publication(s) for author {author_id}")
    return papers


def filter_record(paper: dict[str, Any]) -> Publication | None:
    """Return a typed publication row, or None if the record should be skipped.

    A record is skipped if it has no paper ID, is explicitly listed in
    ``SKIP_PAPER_IDS``, has a confirmed publication type outside
    ``ACCEPTABLE_FORMATS``, or was published before ``MIN_YEAR``. Records
    with a missing/unreported publication type are kept, since Semantic
    Scholar leaves that field unpopulated for many papers.

    Args:
        paper: A raw paper record as returned by the Semantic Scholar API.

    Returns:
        A :class:`Publication` if the record passes all filters, otherwise
        ``None``.
    """
    paperid = paper.get("paperId")
    if paperid is None or paperid in SKIP_PAPER_IDS:
        return None

    pub_types = {pt.lower() for pt in paper.get("publicationTypes") or []} or None
    if pub_types is not None and not pub_types & ACCEPTABLE_FORMATS:
        return None

    year = paper.get("year")
    if year is None or year < MIN_YEAR:
        return None

    title = paper.get("title", "").rstrip(".")
    if title == "":
        return None

    pub_date_raw = paper.get("publicationDate")
    pub_date = parser.parse(pub_date_raw) if pub_date_raw else parser.parse(str(year))

    external_ids = paper.get("externalIds") or {}
    journal = paper.get("journal") or {}
    authors = paper.get("authors") or []

    return Publication(
        paperid=paperid,
        doi=external_ids.get("DOI", ""),
        title=title,
        authors=[a.get("name", "") for a in authors],
        year=pub_date.year,
        month=pub_date.month,
        day=pub_date.day,
        journal=journal.get("name") or paper.get("venue") or "",
        volume=journal.get("volume", ""),
        issue=journal.get("issue", ""),
        pages=journal.get("pages", ""),
    )


async def process_author(author_id: str) -> pl.DataFrame:
    """Fetch and filter an author's papers into a publications DataFrame.

    Args:
        author_id: The Semantic Scholar author ID to process.

    Returns:
        A DataFrame of filtered publications matching ``PUBLICATION_SCHEMA``.
    """
    async with aiohttp.ClientSession(headers=_headers()) as session:
        papers = await fetch_author_papers(session, author_id)
    rows = [row for paper in papers if (row := filter_record(paper)) is not None]
    return pl.DataFrame(rows, schema=PUBLICATION_SCHEMA, orient="row")


def update_and_save_publications(
    df_new: pl.DataFrame, df_old: pl.DataFrame, output_path: Path
) -> None:
    """Merge new publications with existing ones and write to JSON.

    Args:
        df_new: Newly fetched publications.
        df_old: Previously saved publications.
        output_path: Path to write the merged JSON output to. Skipped if
            no new publications are found.
    """
    new_pubs = df_new.join(df_old, on="paperid", how="anti")

    if new_pubs.is_empty():
        logger.info("No new publications found. Skipping save.")
        return

    logger.info("Found %d new publication(s).", len(new_pubs))

    df_final = (
        pl.concat([df_old, new_pubs])
        .fill_null("")
        .sort(["year", "month", "day"], descending=True)
    )

    logger.info("Saving %d total publications to %s...", len(df_final), output_path)
    with open(output_path, "w") as f:
        json.dump(df_final.to_dicts(), f, indent=2)


async def main(pub_fpath: Path) -> None:
    """Fetch new publications for ``AUTHOR_ID`` and merge them into a file.

    Args:
        pub_fpath: Path to the publications JSON file to read from and
            write back to. If it doesn't exist yet, it's treated as an
            empty publication list.
    """
    if pub_fpath.exists():
        pub_df_old = pl.read_json(pub_fpath, schema=PUBLICATION_SCHEMA)
    else:
        logger.info("No existing publication file found, creating a new one")
        pub_df_old = pl.DataFrame(schema=PUBLICATION_SCHEMA)

    pub_df_new = await process_author(AUTHOR_ID)
    update_and_save_publications(pub_df_new, pub_df_old, pub_fpath)


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s - %(levelname)s] %(message)s",
    )
    if len(sys.argv) != 2:
        raise ValueError(f"Expected exactly 1 argument (path), got {len(sys.argv) - 1}")

    asyncio.run(main(Path(sys.argv[1])))
