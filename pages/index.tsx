import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.css'
import socials from '../styles/socials.module.css'

// Components
import { Social } from '../components/socials'
import { HomeFooter } from '../components/footer'

import profileImg from '../public/profile.jpeg'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jason Kai</title>
        <meta name="description" content="Portfolio website" />
        <meta name="author" content="Jason Kai" />

      </Head>

      <main className={styles.main}>

        <div className="row">
          <div className={styles.profileBorder}>
            <div className={styles.profileImg}>
              <Image src={profileImg} />
            </div>
          </div>
        </div>

        <div className="row">
          <h1 className={styles.profileName}>Jason Kai</h1>
        </div>

        <div className="row">
          <h3 className={styles.profileTitle}>Ph.D. Candidate at Western University</h3>
        </div>

        {/* Social icons */}
        <div className={socials.socialRow}>
          <Social />
        </div>

        {/* Homepage navigation */}
        <div className="row">
          <a className="nav-link" href="/about">about</a>
        </div>

        <div className="row">
          <a className="nav-link" href="/publications">publicatons</a>
        </div>
      </main>

      <HomeFooter />
    </div>
  )
}

export default Home
