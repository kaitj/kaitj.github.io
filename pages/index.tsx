import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// Components
import { NavBar } from '../components/navbar'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jason Kai</title>
        <meta name="description" content="Portfolio website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar/>
      
      <main className={styles.main}>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt arcu non sodales neque sodales. Nisi quis eleifend quam adipiscing vitae proin sagittis. Sagittis purus sit amet volutpat consequat mauris nunc congue. Erat velit scelerisque in dictum. Mattis nunc sed blandit libero volutpat sed cras ornare arcu. Sed odio morbi quis commodo odio aenean sed. Amet mattis vulputate enim nulla aliquet porttitor. Scelerisque in dictum non consectetur a. Molestie at elementum eu facilisis sed odio morbi quis. Quisque non tellus orci ac auctor augue mauris augue. Mattis pellentesque id nibh tortor.</p>

        <p>Sed id semper risus in hendrerit gravida rutrum quisque non. A diam sollicitudin tempor id eu nisl nunc. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. Varius quam quisque id diam vel quam elementum pulvinar. Sed vulputate odio ut enim blandit volutpat maecenas. Velit egestas dui id ornare arcu odio ut sem. Consectetur libero id faucibus nisl tincidunt eget nullam non nisi. Pellentesque dignissim enim sit amet venenatis urna cursus eget. A condimentum vitae sapien pellentesque habitant morbi tristique senectus. Dictum varius duis at consectetur. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Id leo in vitae turpis massa sed elementum.</p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
