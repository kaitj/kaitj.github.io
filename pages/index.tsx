import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";
import Row from "react-bootstrap/Row";

// CSS
import styles from "../styles/home.module.css";
import socials from "../styles/socials.module.css";

// Components
import { HomeFooter } from "../components/footer";
import { Social } from "../components/socials";
import navData from "../data/navigation";
import profileImg from "../public/profile.jpeg";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jason Kai</title>
        <meta name="description" content="Portfolio website" />
        <meta name="author" content="Jason Kai" />
      </Head>

      <main className={styles.main}>
        <div className="text-center">
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
            <h3 className={styles.profileTitle}>Research Software Developer</h3>
          </Row>

          {/* Social icons */}
          <div className={socials.socialRow}>
            <Social />
          </div>

          {/* Homepage navigation */}
          <Row>
            <ul className={styles.navList}>
              {navData.map((nav) => (
                <li className={styles.navItem} key={nav.name}>
                  <Link className="nav-link" href={nav.url}>
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Row>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default Home;
