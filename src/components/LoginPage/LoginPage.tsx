import { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/fetch';
import { useAuth } from '../hook/useAuth';

function LoginPage() {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const login = form.login.value;
    const password = form.password.value;
    const body = { login: login, password: password };
    const response = await loginUser(body);
    dispatch({
      type: 'loginUser',
      data: {
        username: state.username || null,
        login: login,
        password: password,
        token: response.token,
        id: state.id || null,
      },
    });
    navigate('/');
  }

  return (
    <>
      <div>Login page</div>
      <Link to="/register">Register</Link>
      <form onSubmit={handleSubmit}>
        <label>
          Login:
          <input name="login" />
        </label>
        <label>
          Password:
          <input name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export { LoginPage };
