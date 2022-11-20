import { PrismicText, PrismicRichText } from '@prismicio/react';
import { RTNode } from '@prismicio/types';
import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { createClient } from '../../../services/prismicio';
import styles from '../post.module.scss';
type PreviewProps = {
  post: {
    slug: string;
    title: [] | [RTNode, ...RTNode[]] | null | undefined;
    updatedAt: string;
    content: [] | [RTNode, ...RTNode[]] | null | undefined;
  };
};

export default function Preview({ post }: PreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  return (
    <>
      <Head>
        <title> {post.slug} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <PrismicRichText field={post.title} />
          <time>{post.updatedAt}</time>
          <div className={`${styles.postContent} ${styles.previewContent}`}>
            <PrismicText field={post.content} />
          </div>
          <div className={styles.continueReading}>
            Wanna continue reading ?<Link href={'/'}>Subscribe now 🥳</Link>
          </div>
        </article>
      </main>
    </>
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params ? params.slug : '';

  const prismic = createClient();

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
    redirect: 60 * 30, // 30 minm
  };
};
