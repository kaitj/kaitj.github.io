import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import styles from '../styles/socials.module.css'

// Resize icons
export const Social = () => {
    return (
        <div className='flex'>
            {/* Email */}
            <a href="mailto:tkai@uwo.ca" target="_blank" rel='noopener me' title="Email">
                <FontAwesomeIcon icon={faEnvelope} className={styles.socialIcon} />
            </a>

            {/* Github */}
            <a href="https://github.com/kaitj" target="_blank" >
                <FontAwesomeIcon icon={faGithub} className={styles.socialIcon} />
            </a>

            {/* Twitter */}
            <a href="https://twitter.com/jasonkai" target="_blank" >
                <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/jason-kai-7a734968/" target="_blank">
                <FontAwesomeIcon icon={faLinkedin} className={styles.socialIcon} />
            </a>
        </div>
    )
};