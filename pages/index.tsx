import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/home.module.css'

// Components
import { NavBar } from '../components/navbar'
import { Profile } from '../components/profile'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jason Kai</title>
        <meta name="description" content="Portfolio website" />
        <meta name="author" content="Jason Kai" />

        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <Profile />

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
