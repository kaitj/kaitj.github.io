// Automate publications in future
import pubstyles from '../styles/publications.module.css'


export const Pubs = () => {
    return (
        <div className="row">
            <h2>Publications &amp; preprints</h2>

            <div className="row">
                <h3 className={pubstyles.pubHeadings}>2023</h3>
                <ul className={pubstyles.pubList}>
                <li className={pubstyles.pubItems}><strong><u>Kai, J.</u></strong>, Mackinley, M., Khan, A.R., Palaniyappan, L. (2023). Aberrant frontal lobe "U"-shaped association fibers in first-episode schizophrenia: A 7-Tesla diffusion imaging study <em>Neuroimage: Clinical</em>. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1016/j.nicl.2023.103367" target="_blank" rel="noreferrer">10.1016/j.nicl.2023.103367</a></li>
                </ul>
                <h3 className={pubstyles.pubHeadings}>2022</h3>
                <ul className={pubstyles.pubList}>
                    <li className={pubstyles.pubItems}>Taha, A., Gilmore, G., Abbass, M., <strong><u>Kai, J.</u></strong>, Kuehn, T., Demarco, J., Gupta, G., Zajner, C., Cao, D., Chevalier, R., Ahmed, A., Hadi, A., Karat, B., Stanley, O.W., Park, P., Ferko, K.M., Hemachandra, D., Vassallo, R., Jach, M., Thurairajah, A., Wong, S., Ogunsanya, F., Tenorio, M.C., Khan, A.R., Lau, J.C. (2022). Magnetic resonance imaging datasets with anatomical fiducials for quality control and registration. <em>biorxiv</em>. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1101/2022.11.21.516173" target="_blank" rel="noreferrer">10.1101/2022.11.21.516173</a></li>

                    <li className={pubstyles.pubItems}>Nichols, E.S., Correa S., Van Dyken, P., <strong><u>Kai, J.</u></strong>, Kuehn, T., de Ribaupierre, S., Duerden, E.G., Khan, A.R. (2022). An automated BIDS-App for brain segmentation of human fetal functional MRI data. <em>biorxiv</em>. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1101/2022.09.02.506391" target="_blank" rel="noreferrer">10.1101/2022.09.02.506391</a></li>

                    <li className={pubstyles.pubItems}>Gui, C., <strong><u>Kai, J.</u></strong>, Khan, A.R., Lau, J.C., Megyesi, J.F. (2022). Detection of local growth patterns in longitudinally imaged low-grade gliomas. <em>biorxiv</em>. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1101/2022.04.24.488099" target="_blank" rel="noreferrer">10.1101/2022.04.24.488099</a></li>

                    <li className={pubstyles.pubItems}><strong><u>Kai, J.</u></strong>, Khan, A.R., Haast, R.A.M., Lau, J.C. (2022). Mapping the subcortical connectome using in vivo diffusion MRI: feasibility and reliability. <em>Terra incognita: diving into the human subcortex</em>, special issue of <em>NeuroImage</em>. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1016/j.neuroimage.2022.119553" target="_blank" rel="noreferrer">10.1016/j.neuroimage.2022.119553</a></li>

                    <li className={pubstyles.pubItems}><strong><u>Kai, J.</u></strong>, &amp; Khan, A.R. (2022). Assessing the Reliability of Template-Based Clustering for Tractography in Healthy Human Adults. <em>Frontiers in Neuroinformatics</em>, 16, 777853. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.3389/fninf.2022.777853" target="_blank" rel="noreferrer">10.3389/fninf.2022.777853</a></li>
                </ul>

                <h3 className={pubstyles.pubHeadings}>2021</h3>
                <ul className={pubstyles.pubList}>
                    <li className={pubstyles.pubItems}>Gau, R., Noble, S., Heuer, K., Bottenhorn, K. L., Bilgin, I. P., Yang, Y.-F., Huntenburg, J. M., Bayer, J. M. M., Bethlehem, R. A. I., Rhoads, S. A., Vogelbacher, C., Borghesani, V., Levitis, E., Wang, H.-T., Van Den Bossche, S., Kobeleva, X., Legarreta, J. H., Guay, S., Atay, S. M., … Zuo, X.-N. (2021). Brainhack: Developing a culture of open, inclusive, community-driven neuroscience. <em>Neuron</em>, 109(11), 1769–1775. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1016/j.neuron.2021.04.001" target="_blank" rel="noreferrer">10.1016/j.neuron.2021.04.001</a> </li>
                </ul>

                <h3 className={pubstyles.pubHeadings}>2020</h3>
                <ul className={pubstyles.pubList}>
                    <li className={pubstyles.pubItems}> Arbabi, A., <strong><u>Kai, J.</u></strong>, Khan, A.R., Baron, C.A. (2020) Diffusion dispersion imaging: Mapping oscillating gradient spin-echo frequency dependence in the human brain. <em>Magnetic Resonance in Medecine</em>, 83, 2207–2218. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1002/mrm.28083" target="_blank" rel="noreferrer">10.1002/mrm.28083</a> </li>
                </ul>

                <h3 className={pubstyles.pubHeadings}>2019</h3>
                <ul className={pubstyles.pubList}>
                    <li className={pubstyles.pubItems}> Lau, J.C., Parrent, A.G., Demarco, J., Gupta, G., <strong><u>Kai, J.</u></strong>, Stanley, O.W., Kuehn, T., Park, P.J., Ferko, K., Khan, A.R., Peters, T.M. (2019) A framework for evaluating correspondence between brain images using anatomical fiducials. <em>Human Brain Mapping</em>, 40, 4163–4179. doi: <a className={pubstyles.pubLinks} href="https://doi.org/10.1002/hbm.24693" target="_blank" rel="noreferrer">10.1002/hbm.24693</a></li>
                </ul>
            </div>
        </div>
    );
};