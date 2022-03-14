import type { NextPage } from 'next'

// Stylesheets 
import home from '../styles/home.module.css'
import contact from '../styles/contact.module.css'

// Components
import { NavBar } from '../components/navbar'
import { Footer } from '../components/footer'
import { ContactForm, Social } from '../components/contact'

const Contact: NextPage = () => {
    return (
        <div className={home.container}>
            <NavBar />

            <main className={home.main}>
                <div className={["row", contact.content].join(' ')}>
                    If you would like to chat about projects or opportunities, please get in touch using one of the methods below.
                </div>

                <Social />

                <ContactForm />
            </main>

            <Footer />

        </div>
    )
}

export default Contact