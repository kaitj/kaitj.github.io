import pubData from "../data/publications.json";
import pubProps from "../interfaces/publications";
import pubStyles from "../styles/publications.module.css";

const pubs: pubProps[] = pubData

export const Pubs = () => {
  // Get unique years and sort in descending order
  const pubYears = Array.from(
    new Set(pubs.map((publication) => publication.year))
  ).sort((a, b) => b - a);

  return (
    <div className="row">
      <h2>Publications &amp; preprints</h2>

      {pubYears.map((year) => (
        <div key={year} className="row">
          <h3 className={pubStyles.pubHeadings}>{year}</h3>
          <ul className={pubStyles.pubList}>
            {pubs
              .filter((pubs) => pubs.year === year)
              .map((pubs) => (
                <li key={pubs.doi} className={pubStyles.pubItems}>
                  {pubs.authors.join(", ")} ({pubs.year} ).
                  <strong>{pubs.title}</strong>
                  . <em>{pubs.journal}</em>. doi:{" "}
                  <a
                    className={pubStyles.pubLinks}
                    href={`https://doi.org/${pubs.doi}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {pubs.doi}
                  </a>
                  .
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
