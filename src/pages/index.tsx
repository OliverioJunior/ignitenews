import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>IgNews</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}></div>
    </>
  );
}
