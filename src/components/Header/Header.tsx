import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/img/Logo.png';
import langchange from '../../assets/img/Langchange.png';
import { clearLocalStorage } from '../../utils/utils';
import { useAuth } from '../hook/useAuth';
import { useTranslation } from 'react-i18next';

function Header() {
  const token = localStorage.getItem('token');
  const [, dispatch] = useAuth();
  const { t, i18n } = useTranslation();

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

  function changeLangHandler(e: React.ChangeEvent<HTMLSelectElement>) {
    const languageValue = e.currentTarget.value;
    i18n.changeLanguage(languageValue);
    localStorage.setItem('lang', languageValue);
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
            <select
              onChange={changeLangHandler}
              defaultValue={localStorage.getItem('lang') || 'en'}
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
            {!token && (
              <nav>
                <Link to="/login">
                  <button className={styles.sign__in}>{t('Sign In')}</button>
                </Link>
                <Link to="/register">
                  <button className={styles.sign__up}>{t('Sign Up')}</button>
                </Link>
              </nav>
            )}
            {token && (
              <nav>
                <Link to="/profile">
                  <button className={styles.sign__in}>{t('Edit Profile')}</button>
                </Link>
                <button className={styles.sign__out} onClick={handleLogOut}>
                  {t('Sign Out')}
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
