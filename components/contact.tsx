import { useForm, ValidationError } from '@formspree/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export const Social = () => {
    return (
        <div className="flex">
            {/* Twitter */}
            <a href="https://twitter.com/jasonkai" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/jason-kai-7a734968/">
            <FontAwesomeIcon icon={faLinkedin} /></a
        </div>
    )
};

// Fix form lengths
export const ContactForm = () => {
    const [state, handleSubmit] = useForm('mayllglo');
    if (state.succeeded) {
        return <p>Thanks for getting touch - I will get back to you as soon as possible!</p>;
    }
    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="row">
                    <div className="col-lg-3">
                        <label htmlFor='name'>Name:</label>
                    </div>
                    <div className="col-lg-8">
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
                <div className="row">
                    <div className="col-lg-3">
                        <label htmlFor='email'>Email:</label>
                    </div>
                    <div className="col-lg-8 col-md-3">
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
                <div className="row">
                    <div className="col-lg-3">
                        <label htmlFor='message'>Your message:</label>
                    </div>
                    <div className="col-lg-9">
                        <textarea id='message' name='message' />
                        <ValidationError prefix='Email' field='email' errors={state.errors} />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="row">
                    <button type='submit' disabled={state.submitting} className='btn btn-primary'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}