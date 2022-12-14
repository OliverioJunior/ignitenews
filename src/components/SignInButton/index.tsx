import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
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
      <FaGithub color="#04d361" />
      {data.user?.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.singInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" />
      Sing in with GitHub
    </button>
  );
};
