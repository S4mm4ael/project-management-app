import { Link } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

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
        <nav>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </nav>
        <div>Welcome Page</div>
      </>
    );
  }

  return (
    <>
      <nav>
        <Link to="/login">
          <button>Sign In</button>
        </Link>
        <button onClick={handleLogOut}>Log Out</button>
      </nav>
      <div>Welcome Page</div>
    </>
  );
}

export default WelcomePage;
