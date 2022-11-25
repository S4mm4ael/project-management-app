import { Link, useNavigate } from 'react-router-dom';
import Boards from '../Boards/Boards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useAuth } from '../hook/useAuth';

function MainPage() {
  return (
    <>
      <Header logged={true} />

      <section className="boards__section">
        <Boards />
      </section>
      <Footer />
    </>
  );
}

export default MainPage;
