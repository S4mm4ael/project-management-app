import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 'calc(100vh - 160px)',
          fontSize: '2rem',
        }}
      >
        <p>{t('Page Not Found')}!</p>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
