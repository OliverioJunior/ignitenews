import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';
/* import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi'; */
interface SubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = () => {
  const { status } = useSession();
  async function handleSubscribe() {
    if (status === 'unauthenticated') signIn('github');
    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout(sessionId);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
};
