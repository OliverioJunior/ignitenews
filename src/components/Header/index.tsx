import { SingInButton } from '../SignInButton';
import styles from './styles.module.scss';
import { FaInstagram } from 'react-icons/fa';
export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1>
          <a
            href="https://www.instagram.com/phane_tavares/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram color="#e1e1e6" />
            phane_tavares
          </a>
        </h1>
        <nav>
          <a className={styles.active}>Home</a>
        </nav>

        <SingInButton />
      </div>
    </header>
  );
};
