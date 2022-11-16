import { ActiveLink } from '../ActiveLink';
import { SingInButton } from '../SignInButton';
import styles from './styles.module.scss';
export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="logo ig.news" />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            Home
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            Posts
          </ActiveLink>
        </nav>

        <SingInButton />
      </div>
    </header>
  );
};
