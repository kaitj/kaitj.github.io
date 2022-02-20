import styles from '../styles/home.module.css'

let year: number = new Date().getFullYear();

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            &copy; {year}
        </footer>
    );
};