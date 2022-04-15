import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/home.module.css'

// Components
import { NavBar } from '../components/navbar'
import { Footer } from '../components/footer'
import { Pubs } from '../components/publications'

const Publications: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Jason Kai</title>
                <meta name="description" content="Portfolio website" />
                <meta name="author" content="Jason Kai" />

            </Head>

            <NavBar />

            <main className={styles.main}>
                <div className="col-2"></div>

                <div className="col-8"><Pubs />
                </div>

                <div className="col-2"></div>
            </main>

            <Footer />
        </div>
    )
}

export default Publications