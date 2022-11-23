import { useAuth } from '../hook/useAuth';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './WelcomePage.module.css';
import welcome from '../../assets/img/welcome-left.png';
import team from '../../assets/img/team-right.png';
import dasha from '../../assets/img/dasha.png';
import sam from '../../assets/img/sam.png';
import { clearLocalStorage } from '../../utils/utils';

function WelcomePage() {
  const token = localStorage.getItem('token');
  const [state, dispatch] = useAuth();

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
  if (!token) {
    return (
      <>
        <Header />
        <section className={styles.welcome__section}>
          <div className={styles.welcome__top}>
            <div className={styles.welcome__left}>
              <img className={styles.welcome__img} src={welcome} alt="welcome" />
            </div>
            <div className={styles.welcome__right}>
              <div className={styles.right__text}>
                <h1>Team task manager app</h1>
                <article>
                  Our project management app allows users to centrally manage tasks and their timely
                  completion. Trackers are widely used in project management, because they allow you
                  to easily monitor all work processes and control the work of the team
                </article>
                <div className={styles.button__container}>
                  <button className={styles.sign__in}>Demo</button>
                  <button className={styles.sign__up}>Lets try!</button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.team}>
            <div className={styles.team__left}>
              <div className={styles.team__item}>
                <div className={styles.team__photo}>
                  <img src={dasha} alt="dasha" />
                </div>
                <div className={styles.team__text}>
                  <h3>Darya Usova</h3>
                  <div className={styles.text__paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </div>
                </div>
              </div>
              <div className={styles.team__item}>
                <div className={styles.team__photo}>
                  <img src={sam} alt="sam" />
                </div>
                <div className={styles.team__text}>
                  <h3>Semion Krapivin</h3>
                  <div className={styles.text__paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.team__right}>
              <img className={styles.welcome__img} src={team} alt="team" />
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <nav>
        <button onClick={handleLogOut}>Log Out</button>
      </nav>
      <div>Welcome Page</div>
    </>
  );
}

export default WelcomePage;
