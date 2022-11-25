import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/img/Logo.png';
import langchange from '../../assets/img/Langchange.png';
import { useAuth } from '../hook/useAuth';

function Header() {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem('token');
    dispatch({
      type: 'user',
      data: {
        username: null,
        login: null,
        token: null,
        id: null,
      },
    });
    navigate('/');
  }

  return (
    <>
      <header>
        <div className={styles.header__wrapper}>
          <div className={styles.header__logo}>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.nav__wrapper}>
            <img className={styles.lang} src={langchange} alt="choose lang" />
            <nav>
              {localStorage.getItem('token') ? (
                <Link to="/profile">
                  <button className={styles.sign__in}>Edit Profile</button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className={styles.sign__in}>Sign In</button>
                </Link>
              )}
              {localStorage.getItem('token') ? (
                <button className={styles.sign__up} onClick={handleLogOut}>
                  Log out
                </button>
              ) : (
                <Link to="/register">
                  <button className={styles.sign__up}>Sign Up</button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
