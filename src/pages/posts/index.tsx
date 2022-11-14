import { GetStaticProps } from 'next';
import Head from 'next/head';
import { createClient } from '../../services/prismicio';
import styles from './styles.module.scss';
import { PrismicRichText, PrismicText } from '@prismicio/react';
type ContentProps = {
  title: [];
  content: [];
};
type DataProps = {
  data: ContentProps;
};
export default function Posts({ data }: any) {
  console.log(data);
  return (
    <>
      <Head>
        <title>Posts | Ignews </title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {data.map((item: any) => {
            return (
              <a href="#" key={item.slug}>
                <time>{item.updatedAt}</time>
                <strong>
                  <PrismicText field={item.title} />
                </strong>
                <p>
                  <PrismicText field={item.excerpt} />
                </p>
              </a>
            );
          })}
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

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const prismic = createClient({ previewData });

  const response = await prismic.getAllByType('faculdade');
  const data = response.map(item => {
    return {
      slug: item.uid,
      title: item.data.title,
      excerpt: item.data.content,
      updatedAt: new Date(item.last_publication_date).toLocaleDateString(
        'pt-Br',
        { day: '2-digit', month: 'long', year: 'numeric' },
      ),
    };
  });
  return {
    props: {
      data,
    },
  };
};
