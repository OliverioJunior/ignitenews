import Link from 'next/link';
import { SingInButton } from '../SignInButton';
import styles from './styles.module.scss';
export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="logo ig.news" />
        <nav>
          <Link href="/" className={styles.active}>
            Home
          </Link>
          <Link href="/posts">Posts</Link>
        </nav>

        <SingInButton />
      </div>
    </header>
  );
};
