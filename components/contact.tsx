import { useForm, ValidationError } from '@formspree/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import styles from '../styles/contact.module.css'

// Resize icons
export const Social = () => {
    return (
        <div className="flex">
            {/* Twitter */}
            <a href="https://twitter.com/jasonkai" target="_blank" >
                <FontAwesomeIcon icon={faTwitter} className={styles.socialIcon} />
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/jason-kai-7a734968/">
                <FontAwesomeIcon icon={faLinkedin} className={styles.socialIcon} />
            </a>
        </div>
    )
};

// Contact form
export const ContactForm = () => {
    const [state, handleSubmit] = useForm('mayllglo');
    if (state.succeeded) {
        return <p>Thanks for getting touch - I will get back to you as soon as possible!</p>;
    }
    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className={["row", styles.form].join(' ')}>
                    <div className="col-3">
                        <label htmlFor='name'>Name:</label>
                    </div>
                    <div className="col-9">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="John Doe"
                        />
                        <ValidationError prefix='Name' field='name' errors={state.errors} />
                    </div>
                </div>

                {/* Email */}
                <div className={["row", styles.form].join(' ')}>
                    <div className="col-3">
                        <label htmlFor='email'>Email:</label>
                    </div>
                    <div className="col-9">
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="johndoe@email.com"
                        />
                        <ValidationError prefix='Email' field='email' errors={state.errors} />
                    </div>
                </div>

                {/* Message */}
                <div className={["row", styles.form].join(' ')}>
                    <div className="col-3">
                        <label htmlFor='message'>Your message:</label>
                    </div>
                    <div className="col-9">
                        <textarea id='message' name='message' className={styles.fixWidth} />
                        <ValidationError prefix='Email' field='email' errors={state.errors} />
                    </div>
                </div>

                {/* Submit Button */}
                <div className={["row", styles.form].join(' ')}>
                    <div className="col-3"></div>
                    <div className="col-9">
                        <button type='submit' disabled={state.submitting} className={['btn', 'btn-primary', styles.fixWidth].join(' ')}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}