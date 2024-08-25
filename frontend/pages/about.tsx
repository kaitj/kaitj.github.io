import type { NextPage } from 'next'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import styles from '../styles/home.module.css'

// Components
import { Footer } from '../components/footer'
import { NavBar } from '../components/navbar'
import { Profile } from '../components/profile'

const About: NextPage = () => {
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
          <Profile />
        </Container>

      </main>

      <Footer />
    </div>
  )
}

export default About
