import styles from '../styles/home.module.css'

export const Footer = () => {
    let year: number = new Date().getFullYear();
    
    return (
        <footer className={styles.footer}>
            &copy; {year} Jason Kai
        </footer>
    );
};