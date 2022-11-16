import { PrismicText, PrismicRichText } from '@prismicio/react';
import { RTNode } from '@prismicio/types';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { createClient } from '../../services/prismicio';
import styles from './post.module.scss';
type Post = {
  post: {
    slug: string;
    title: [] | [RTNode, ...RTNode[]] | null | undefined;
    updatedAt: string;
    content: [] | [RTNode, ...RTNode[]] | null | undefined;
  };
};

export default function Post({ post }: Post) {
  const text = <PrismicText field={post.title} />;
  return (
    <>
      <Head>
        <title> {post.slug} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <PrismicRichText field={post.title} />
          <time>{post.updatedAt}</time>
          <div className={styles.postContent}>
            <PrismicText field={post.content} />
          </div>
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  previewData,
}) => {
  const session = await getSession({ req });
  const slug = params ? params.slug : '';
  /* if(!session) {

  } */

  const prismic = createClient({ previewData });

  const response = await prismic.getByUID('faculdade', String(slug), {});
  console.log(response);
  const post = {
    slug,
    title: response.data.title,
    content: response.data.content,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-Br',
      { day: '2-digit', month: 'long', year: 'numeric' },
    ),
  };

  return {
    props: {
      post,
    },
  };
};
