import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import styles from '../styles/socials.module.css'

// Home social component
export const Social = () => {
    return (
        <div className='flex'>
            {/* Email */}
            <a href="mailto:tkai@uwo.ca" target="_blank" rel='noopener noreferrer' title="Email" >
                <FontAwesomeIcon icon={faEnvelope} className={styles.socialHome} />
            </a>

            {/* Github */}
            <a href="https://github.com/kaitj" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} className={styles.socialHome} />
            </a>

            {/* Twitter */}
            <a href="https://twitter.com/jasonkai" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} className={styles.socialHome} />
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/jasonkai/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className={styles.socialHome} />
            </a>
        </div>
    )
};

// Footer social component
export const SocialFooter = () => {
    return (
        <div className='flex'>
            {/* Email */}
            <a href="mailto:tkai@uwo.ca" target="_blank" rel='noopener noreferrer' title="Email" >
                <FontAwesomeIcon icon={faEnvelope} className={styles.socialIcon} />
            </a>

            {/* Github */}
            <a href="https://github.com/kaitj" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} className={styles.socialIcon} />
            </a>

            {/* Twitter */}
            <a href="https://twitter.com/jasonkai" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/jasonkai/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className={styles.socialIcon} />
            </a>
        </div>
    )
};