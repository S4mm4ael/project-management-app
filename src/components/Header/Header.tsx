import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/img/Logo.png';
import langchange from '../../assets/img/Langchange.png';

function Header() {
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
              <Link to="/login">
                <button className={styles.sign__in}>Sign In</button>
              </Link>
              <Link to="/register">
                <button className={styles.sign__up}>Sign Up</button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
