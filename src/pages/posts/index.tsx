import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews </title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 março de 2020</time>
            <strong>Teste teste teste</strong>
            <p>Um breve paragrafo</p>
          </a>
          <a href="#">
            <time>12 março de 2020</time>
            <strong>Teste teste teste</strong>
            <p>Um breve paragrafo</p>
          </a>
        </div>
      </main>
    </>
  );
}
