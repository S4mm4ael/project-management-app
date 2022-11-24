import { Link, useNavigate } from 'react-router-dom';
import Boards from '../Boards/Boards';
import { useAuth } from '../hook/useAuth';

function MainPage() {
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
      <div>Main Page</div>
      <Link to="/profile">
        <button>Edit Profile</button>
      </Link>
      <button onClick={handleLogOut}>Log out</button>
      <section className="boards__section">
        <Boards />
      </section>
    </>
  );
}

export default MainPage;
