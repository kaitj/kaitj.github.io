# /// script
# dependencies = ["biopython>=1.86", "polars>=1.38.1", "python-dateutil>=2.9.0.post0"]
# requires-python = ">=3.12"
# ///

"""Get details of relevant publications found on PubMed."""

import json
import sys
from collections.abc import Sequence
from pathlib import Path
from typing import NamedTuple

import polars as pl
from Bio import Entrez, Medline
from dateutil import parser

ENTREZ_EMAIL = "21226986+kaitj@users.noreply.github.com"
FETCH_CHUNK_SIZE = 200

SEARCH_CRITERIA = (
    '"Kai J"[AUTH] AND ("2015/01/01"[PDAT] : "3000/12/31"[PDAT]) AND'
    ' ("Western University"[AFFL] OR "University of Western Ontario"[AFFL] OR'
    ' "Robarts Research Institute"[AFFL] OR "Child Mind Institute"[AFFL])'
)

SKIP_PMIDS: frozenset[str] = frozenset()
ACCEPTABLE_FORMATS: frozenset[str] = frozenset(
    {"journal article", "comparative study", "editorial"}
)

PUBLICATION_SCHEMA: dict[str, pl.DataType] = {
    "pmid": pl.Utf8,
    "pmcid": pl.Utf8,
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
    pmid: str
    pmcid: str
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


def search_pubmed(term: str) -> list[str]:
    """Search PubMed and return all matching PMIDs in a single request."""
    Entrez.email = ENTREZ_EMAIL
    with Entrez.esearch(db="pubmed", term=term, retmax=10_000) as handle:
        result = Entrez.read(handle)

    pmids: list[str] = result["IdList"]
    print(f"Found {result['Count']} publications ({len(pmids)} returned)")
    return pmids


def fetch_pubmed_records(pmid_list: Sequence[str]) -> list[Medline.Record]:
    """Fetch and parse PubMed records in chunks to avoid timeouts."""
    # Pre-filter known skip PMIDs before hitting the network
    pmid_list = [p for p in pmid_list if p not in SKIP_PMIDS]

    records: list[Medline.Record] = []
    for i in range(0, len(pmid_list), FETCH_CHUNK_SIZE):
        chunk = pmid_list[i : i + FETCH_CHUNK_SIZE]
        with Entrez.efetch(
            db="pubmed", id=chunk, rettype="medline", retmode="text"
        ) as handle:
            records.extend(Medline.parse(handle))

    return records


def filter_record(record: Medline.Record) -> Publication | None:
    """Return a typed publication row, or None if the record should be skipped."""
    pub_types = {pt.lower() for pt in record.get("PT", [])}
    pmid: str = record.get("PMID", "")

    if not pmid or pmid in SKIP_PMIDS or not pub_types & ACCEPTABLE_FORMATS:
        return None

    pmcid: str = record.get("PMC", "")
    doi: str = next(
        (
            aid.replace(" [doi]", "")
            for aid in record.get("AID", [])
            if aid.endswith(" [doi]")
        ),
        "",
    )
    title: str = record.get("TI", "").rstrip(".")
    authors: list[str] = record.get("AU", [])
    pub_date = parser.parse(record.get("DP", "1900"))
    journal: str = record.get("TA", "")
    volume: str = record.get("VI", "")
    issue: str = record.get("IP", "")
    pages: str = record.get("PG", "")

    return Publication(
        pmid=pmid,
        pmcid=pmcid,
        doi=doi,
        title=title,
        authors=authors,
        year=pub_date.year,
        month=pub_date.month,
        day=pub_date.day,
        journal=journal,
        volume=volume,
        issue=issue,
        pages=pages,
    )


def process_search_terms(search_term: str) -> pl.DataFrame:
    """Search PubMed and return a DataFrame of filtered publication records."""
    pmids = search_pubmed(search_term)
    records = fetch_pubmed_records(pmids)

    rows: list[Publication] = [
        row for record in records if (row := filter_record(record))
    ]

    return pl.DataFrame(rows, schema=PUBLICATION_SCHEMA, orient="row")


def update_and_save_publications(
    df_new: pl.DataFrame,
    df_old: pl.DataFrame,
    output_path: Path,
) -> None:
    """Merge new publications with existing ones and write to JSON."""
    new_pubs = df_new.join(df_old, on="pmid", how="anti")

    if new_pubs.is_empty():
        print("No new publications found. Skipping save.")
        return

    print(f"Found {len(new_pubs)} new publication(s).")

    df_final = (
        pl.concat([df_old, new_pubs])
        .fill_null("")
        .sort(["year", "month", "day"], descending=True)
    )

    print(f"Saving {len(df_final)} total publications to {output_path}...")
    with open(output_path, "w") as f:
        json.dump(df_final.to_dicts(), f, indent=2)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise ValueError(f"Expected exactly 1 argument (path), got {len(sys.argv) - 1}")

    pub_fpath = Path(sys.argv[1])
    if not pub_fpath.exists():
        raise FileNotFoundError(f"Publication file not found: {pub_fpath}")

    pub_df_old = pl.read_json(pub_fpath, schema=PUBLICATION_SCHEMA)
    pub_df_new = process_search_terms(SEARCH_CRITERIA)
    update_and_save_publications(pub_df_new, pub_df_old, pub_fpath)
