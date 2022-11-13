import { CreateClientConfig } from '@prismicio/next/dist/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { createClient } from '../../services/prismicio';
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

export const getStaticProps: GetStaticProps = async ({
  previewData,
}: CreateClientConfig) => {
  const prismic = createClient(previewData);

  const response = await prismic.getSingle('homepage');

  return {
    props: {
      response,
    },
  };
};
