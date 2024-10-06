"""Main run script for PubMed search and processing."""

import json
import sys
from pathlib import Path
from typing import Any

import polars as pl
from Bio import Entrez, Medline
from dateutil import parser

SEARCH_CRITERIA = """"Kai J"[AUTH] AND ("2015/01/01"[PDAT] : "3000/12/31"[PDAT]) AND
        ("Western University"[AFFL] OR "University of Western Ontario"[AFFL] OR
        "Robarts Research Institute"[AFFL] OR "Child Mind Institute"[AFFL])"""


SKIP_PMIDS = set()
ACCEPTABLE_FORMATS = {"journal article", "comparative study", "editorial"}
PUBLICATION_SCHEMA = {
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


def search_pubmed(term: str) -> list[str]:
    """Search for relevant publications."""
    Entrez.email = ""
    with Entrez.esearch(db="pubmed", term=term, retmax=0) as search:
        result = Entrez.read(search)
        total_count = int(result["Count"])

    print(f"Total number of publications containing {term}: {total_count}")

    with Entrez.esearch(db="pubmed", term=term, retmax=total_count) as search_all:
        result_all = Entrez.read(search_all)
    return result_all["IdList"]


def fetch_pubmed_records(pmid_list: list[str]) -> list[dict[str, Any]]:
    """Fetch and parse PubMed records by PMID."""
    handle = Entrez.efetch(db="pubmed", id=pmid_list, rettype="medline", retmode="text")
    records = list(Medline.parse(handle))
    handle.close()
    return records


def filter_record(record: dict[str, Any]) -> list[Any] | None:
    """Filter out unwanted records based on publication type and skip PMIDs."""
    pub_types = {type_.lower() for type_ in record.get("PT", [])}
    pmid = record.get("PMID")

    if pmid in SKIP_PMIDS or not pub_types.intersection(ACCEPTABLE_FORMATS):
        return None

    pmcid = record.get("PMC", "")
    doi = next(
        (
            aid.replace(" [doi]", "")
            for aid in record.get("AID", [])
            if aid.endswith(" [doi]")
        ),
        "",
    )
    title = record.get("TI", "").rstrip(".")
    authors = record.get("AU", [])
    pub_date = parser.parse(record.get("DP", ""))
    journal = record.get("TA", "")
    volume = record.get("VI", "")
    issue = record.get("IP", "")
    pages = record.get("PG", "")

    return [
        pmid,
        pmcid,
        doi,
        title,
        authors,
        pub_date.year,
        pub_date.month,
        pub_date.day,
        journal,
        volume,
        issue,
        pages,
    ]


def process_search_terms(search_term: str) -> pl.DataFrame:
    """Process all search terms and return a DataFrame with relevant records."""
    pmids = search_pubmed(search_term)
    records = fetch_pubmed_records(pmids)

    rows = [
        filtered_record
        for record in records
        if (filtered_record := filter_record(record))
    ]

    return pl.DataFrame(rows, schema=PUBLICATION_SCHEMA, orient="row")


def update_and_save_publications(
    df_new: pl.DataFrame,
    df_old: pl.DataFrame,
    output_path: Path,
) -> None:
    """Update the old publications and save the final DataFrame to a JSON file."""
    df_new = df_new.with_columns(pl.col("pmid").cast(pl.Utf8))
    new_pubs = df_new.join(df_old, on="pmid", how="anti")

    df_final = pl.concat([df_old, new_pubs]).sort(
        ["year", "month", "day"], descending=True
    )
    df_final = df_final.fill_null("")

    print("Saving identified publications to JSON...")
    with open(output_path, "w") as f:
        json.dump(df_final.to_dicts(), f, indent=2)


if __name__ == "__main__":
    if len(sys.argv) > 2:
        raise ValueError("More than 2 arguments provided")
    pub_fpath = Path(sys.argv[-1])
    pub_df_old = pl.read_json(pub_fpath, schema=PUBLICATION_SCHEMA)
    pub_df_new = process_search_terms(SEARCH_CRITERIA)
    update_and_save_publications(pub_df_new, pub_df_old, pub_fpath)
