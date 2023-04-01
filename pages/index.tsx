import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Row from 'react-bootstrap/Row'

// CSS
import styles from '../styles/home.module.css'
import socials from '../styles/socials.module.css'

// Components
import { Social } from '../components/socials'
import { HomeFooter } from '../components/footer'
import profileImg from '../public/profile.jpeg'
import navData from '../data/navigation'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jason Kai</title>
        <meta name="description" content="Portfolio website" />
        <meta name="author" content="Jason Kai" />

      </Head>

      <main className={styles.main}>

        <Row>
          <div className={styles.profileBorder}>
            <div className={styles.profileImg}>
              <Image src={profileImg} alt="Profile picture" />
            </div>
          </div>
        </Row>

        <Row>
          <h1 className={styles.profileName}>Jason Kai</h1>
        </Row>

        <Row>
          <h3 className={styles.profileTitle}>Research Software Engineer</h3>
        </Row>

        {/* Social icons */}
        <div className={socials.socialRow}>
          <Social />
        </div>

        {/* Homepage navigation */}
        <Row>
          <ul className={styles.navList}>
            {navData.map((nav) => 
              <li className={styles.navItem} key={nav.name}>
                <Link href={nav.url}>
                  <a className="nav-link">{nav.name}</a>
                </Link>
              </li>
            )}
          </ul>
            
        </Row>
      </main>

      <HomeFooter />
    </div>
  )
}

export default Home
