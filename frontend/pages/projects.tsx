import type { NextPage } from 'next'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'

import styles from '../styles/home.module.css'

// Components
import { Footer } from '../components/footer'
import { NavBar } from '../components/navbar'
import { Projs } from '../components/projects'

const Projects: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Jason Kai</title>
                <meta name="description" content="Portfolio website" />
                <meta name="author" content="Jason Kai" />

            </Head>

            <NavBar />

            <main className={styles.main}>
                <Container>
                    <p>
                        Below are some selected projects I have contributed to. For a full list, please check out my <a href="https://github.com/kaitj" target="_blank">GitHub</a>.
                    </p>
                    <br/>
                    
                    <Projs />
                </Container>
            </main>

            <Footer />
        </div>
    )
}

export default Projects