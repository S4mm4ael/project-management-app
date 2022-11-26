import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/img/Logo.png';
import langchange from '../../assets/img/Langchange.png';
import { clearLocalStorage } from '../../utils/utils';
import { useAuth } from '../hook/useAuth';

function Header() {
  const token = localStorage.getItem('token');
  const [, dispatch] = useAuth();

  function handleLogOut() {
    clearLocalStorage();
    dispatch({
      type: 'user',
      data: {
        username: null,
        login: null,
        token: null,
        id: null,
      },
    });
  }

  return (
    <>
      <header>
        <div className={styles.header__wrapper}>
          <div className={styles.header__logo}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className={styles.nav__wrapper}>
            <img className={styles.lang} src={langchange} alt="choose lang" />

            {!token && (
              <nav>
                <Link to="/login">
                  <button className={styles.sign__in}>Sign In</button>
                </Link>
                <Link to="/register">
                  <button className={styles.sign__up}>Sign Up</button>
                </Link>
              </nav>
            )}
            {token && (
              <nav>
                <Link to="/profile">
                  <button className={styles.sign__in}>Edit Profile</button>
                </Link>
                <button className={styles.sign__up} onClick={handleLogOut}>
                  Log out
                </button>
              </nav>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
