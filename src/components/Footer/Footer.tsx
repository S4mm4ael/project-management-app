import React from 'react';
import styles from './Footer.module.css';
import rslogo from '../../assets/img/rs_school_js.svg';

function Footer() {
  return (
    <>
      <footer>
        <div className={styles.footer__wrapper}>
          <div className="footer__left">
            <a href="https://rs.school/">
              <img src={rslogo} alt="RS School" height="30px" />
            </a>
          </div>
          <div className="footer__center">2022</div>
          <div className={styles.footer__right}>
            <a href="https://github.com/Sammily">Dasha </a>
            <a href="https://github.com/S4mm4ael"> Semion</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
