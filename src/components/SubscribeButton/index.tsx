import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss';
/* import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi'; */
interface SubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = () => {
  const { status } = useSession();
  function handleSubscribe() {
    if (status === 'unauthenticated') signIn('github');
  }

  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
};
