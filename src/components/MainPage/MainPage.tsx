import { Link } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

function MainPage() {
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

  return (
    <>
      <div>Main Page</div>
      <Link to="/profile">
        <button>Edit Profile</button>
      </Link>
      <button onClick={handleLogOut}>Log out</button>
    </>
  );
}

export default MainPage;
