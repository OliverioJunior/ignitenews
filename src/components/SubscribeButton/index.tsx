import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';
/* import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi'; */
interface SubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  async function handleSubscribe() {
    if (status === 'unauthenticated') {
      return signIn('github');
    }

    if (session?.activeSubscription) router.push('/posts');
    try {
      const response = await api.post('/subscribe');
      const sessionId = response.data;
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout(sessionId);
    } catch (err) {
      console.log(err + 'buttonSubscribe');
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={() => handleSubscribe()}
    >
      Subscribe now
    </button>
  );
};
