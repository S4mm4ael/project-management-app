import { Link, useNavigate } from 'react-router-dom';
import { clearLocalStorage } from '../../utils/utils';
import { useAuth } from '../hook/useAuth';

function MainPage() {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();

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
    navigate('/');
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
