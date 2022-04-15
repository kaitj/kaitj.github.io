import styles from '../styles/home.module.css'
import socials from '../styles/socials.module.css'

import { Social } from '../components/socials'

export const HomeFooter = () => {
    let year: number = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            &copy; {year} Jason Kai
        </footer>
    );
};

export const Footer = () => {
    let year: number = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={["row", socials.socialRow].join(' ')}>
                <Social />
            </div>
            <div className="row">
                &copy; {year} Jason Kai
            </div>
        </footer>
    );
};