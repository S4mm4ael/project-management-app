import { useAuth } from '../hook/useAuth';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function WelcomePage() {
  const token = localStorage.getItem('token');
  const [state, dispatch] = useAuth();

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
  }
  if (!token) {
    return (
      <>
        <Header />
        <div>Welcome Page</div>
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
