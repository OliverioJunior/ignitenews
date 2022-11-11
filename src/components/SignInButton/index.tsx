import styles from './styles.module.scss';
import { HiOutlineMail } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/react';
export const SingInButton: React.FC = () => {
  const { status, data } = useSession();
  return status === 'authenticated' ? (
    <button
      type="button"
      className={styles.singInButton}
      onClick={() => {
        signOut();
      }}
    >
      <HiOutlineMail color="#124E3B" />
      {data.user?.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.singInButton}
      onClick={() => signIn('github')}
    >
      <HiOutlineMail color="#7EB9A4" />
      Sing in with Gmail
    </button>
  );
};
