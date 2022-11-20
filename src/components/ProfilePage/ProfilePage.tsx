import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

function ProfilePage() {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();

  function handleClick() {
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
      <div>Profile Page</div>
      <Link to="/main">
        <button>Main page</button>
      </Link>
      <button onClick={handleClick}>Log out</button>
    </>
  );
}

export default ProfilePage;
