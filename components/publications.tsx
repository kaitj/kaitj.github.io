// Automate publications in future
import pubstyles from '../styles/publications.module.css'


export const Pubs = () => {
    return (
        <div className="row">
            <h2>Publications &amp; preprints</h2>

            <div className="row">
                <h3 className={pubstyles.pubHeadings}>2022</h3>
                <ul>
                    <li className={pubstyles.pubItems}><strong><u>Kai, J.</u></strong>, Khan, A.R., Haast, R.A.M., Lau, J.C. (2022). Mapping the subcortical connectome using in vivo diffusion MRI: feasibility and reliability. <em>biorxiv</em>. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1101/2022.03.28.485689" target="_blank" rel="noreferrer">10.1101/2022.03.28.485689</a></li>

                    <li className={pubstyles.pubItems}><strong><u>Kai, J.</u></strong>, &amp; Khan, A.R. (2022). Assessing the Reliability of Template-Based Clustering for Tractography in Healthy Human Adults. <em>Frontiers in Neuroinformatics</em>, 16, 777853. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.3389/fninf.2022.777853" target="_blank" rel="noreferrer">10.3389/fninf.2022.777853</a></li>
                </ul>

                <h3 className={pubstyles.pubHeadings}>2021</h3>
                <ul>
                    <li className={pubstyles.pubItems}>Gau, R., Noble, S., Heuer, K., Bottenhorn, K. L., Bilgin, I. P., Yang, Y.-F., Huntenburg, J. M., Bayer, J. M. M., Bethlehem, R. A. I., Rhoads, S. A., Vogelbacher, C., Borghesani, V., Levitis, E., Wang, H.-T., Van Den Bossche, S., Kobeleva, X., Legarreta, J. H., Guay, S., Atay, S. M., … Zuo, X.-N. (2021). Brainhack: Developing a culture of open, inclusive, community-driven neuroscience. <em>Neuron</em>, 109(11), 1769–1775. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1016/j.neuron.2021.04.001" target="_blank" rel="noreferrer">10.1016/j.neuron.2021.04.001</a> </li>
                </ul>

                <h3 className={pubstyles.pubHeadings}>2020</h3>
                <ul>
                    <li className={pubstyles.pubItems}> Arbabi, A., <strong><u>Kai, J.</u></strong>, Khan, A.R., Baron, C.A. (2020) Diffusion dispersion imaging: Mapping oscillating gradient spin-echo frequency dependence in the human brain. <em>Magnetic Resonance in Medecine</em>, 83, 2207–2218. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1002/mrm.28083" target="_blank" rel="noreferrer">10.1002/mrm.28083</a> </li>
                </ul>

                <h3 className={pubstyles.pubHeadings}>2019</h3>
                <ul>
                    <li className={pubstyles.pubItems}> Lau, J.C., Parrent, A.G., Demarco, J., Gupta, G., <strong><u>Kai, J.</u></strong>, Stanley, O.W., Kuehn, T., Park, P.J., Ferko, K., Khan, A.R., Peters, T.M. (2019) A framework for evaluating correspondence between brain images using anatomical fiducials. <em>Human Brain Mapping</em>, 40, 4163–4179. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1002/hbm.24693" target="_blank" rel="noreferrer">10.1002/hbm.24693</a></li>
                </ul>
            </div>
        </div>
    );
};