import { GetServerSideProps } from 'next';
import Head from 'next/head';
import stripe from 'stripe';
import styles from '../../styles/Home.module.scss';
import { SubscribeButton } from '../components/SubscribeButton';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | IgNews</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.container}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about <br /> the <span> React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.90 month</span>
          </p>

          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1Lz6M0HOKwH0vkwQvoxyYZJ1', {
    expand: ['product'],
  });
  return {
    props: {
      name: 'oliverios',
    },
  };
};
