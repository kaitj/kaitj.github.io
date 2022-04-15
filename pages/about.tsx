import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/home.module.css'

// Components
import { NavBar } from '../components/navbar'
import { Profile } from '../components/profile'
import { Footer } from '../components/footer'

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
        <div className='col-2'></div>

        <div className='col-8'>
          <Profile />
        </div>

        <div className='col-2'></div>
      </main>

      <Footer />
    </div>
  )
}

export default About
