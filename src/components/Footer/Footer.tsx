import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <>
      <footer>
        <div className={styles.footer__wrapper}>
          <div className="footer__left">
            <a href="https://rs.school/">RS School</a>
          </div>
          <div className="footer__center">2022</div>
          <div className="footer__right">
            <a href="https://github.com/">GitHub</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
