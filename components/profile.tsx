import Image from 'next/image'
import styles from '../styles/home.module.css'

import profile from "../public/profile.png"

export const Profile = () => {
    return (
        <main className={styles.main}>
            <div className="row">
                <div className={["col-lg-6", styles.profileImg].join(' ')}>
                    <Image src={profile} />
                </div>

                <div className={['col-lg-6', styles.profile].join(' ')}>
                    <p>Hi there and thanks for visiting! I am currently a PhD
                        Candidate at Western University, studying the short-range connectivity
                        in the human brain. My work uses MRI to reconstruct the connections
                        of the brain, examining the reliability of identifying these connections
                        and how they may be affected in association with disease.</p>

                    <p>To help accomplish my research goals, I use a variety of computational
                        techniques to develop tools and perform analysis. I mainly program
                        in Python, but am also familiar with other programming languages and
                        have contributed to a number of different projects! You can check out
                        some of the projects I have been involved in over on the portfolio page.</p>
                </div>
            </div>
        </main>
    );
};