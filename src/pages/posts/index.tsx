import { GetStaticProps } from 'next';
import Head from 'next/head';
import { createClient } from '../../services/prismicio';
import styles from './styles.module.scss';
import { PrismicText } from '@prismicio/react';
import { RTNode } from '@prismicio/types';
import Link from 'next/link';
type Post = {
  slug: string;
  title: [] | [RTNode, ...RTNode[]] | null | undefined;
  updatedAt: string;
  excerpt: [] | [RTNode, ...RTNode[]] | null | undefined;
};
type PostProps = {
  data: Post[];
};
export default function Posts({ data }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | Ignews </title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {data.map(item => (
            <Link href={`/posts/${item.slug}`} key={item.slug}>
              <time>{item.updatedAt}</time>
              <strong>
                <PrismicText field={item.title} />
              </strong>
              <p>
                <PrismicText field={item.excerpt} />
              </p>
            </Link>
          ))}
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
