import pubData from "../data/publications";
import pubStyles from "../styles/publications.module.css";

export const Pubs = () => {
  // Get unique years and sort in descending order
  const pubYears = Array.from(
    new Set(pubData.map((publication) => publication.year))
  ).sort((a, b) => b - a);

  return (
    <div className="row">
      <h2>Publications &amp; preprints</h2>

      {pubYears.map((year) => (
        <div key={year} className="row">
          <h3 className={pubStyles.pubHeadings}>{year}</h3>
          <ul className={pubStyles.pubList}>
            {pubData
              .filter((pubData) => pubData.year === year)
              .map((pubData) => (
                <li key={pubData.doi} className={pubStyles.pubItems}>
                  {pubData.authors.join(", ")} ({pubData.year}). {pubData.title}
                  . <em>{pubData.journal}</em>. doi:{" "}
                  <a
                    className={pubStyles.pubLinks}
                    href={`https://doi.org/${pubData.doi}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {pubData.doi}
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
