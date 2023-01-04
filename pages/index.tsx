import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/home.module.css'
import socials from '../styles/socials.module.css'

import { Social } from '../components/socials'
// Components
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
              <Image src={profileImg} alt="Profile picture" />
            </div>
          </div>
        </div>

        <div className="row">
          <h1 className={styles.profileName}>Jason Kai</h1>
        </div>

        <div className="row">
          <h3 className={styles.profileTitle}>Research Software Developer @ Robarts Research Institute</h3>
        </div>

        {/* Social icons */}
        <div className={socials.socialRow}>
          <Social />
        </div>

        {/* Homepage navigation */}
        <div className="row">
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link href='/about'><a className="nav-link">about</a></Link></li>
            <li className={styles.navItem}><Link href="/projects"><a className="nav-link">projects</a></Link></li>
            <li className={styles.navItem}><Link href="/publications"><a className="nav-link">publications</a></Link></li>
          </ul>
        </div>
      </main>

      <HomeFooter />
    </div>
  )
}

export default Home
