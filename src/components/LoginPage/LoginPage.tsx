import { FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/fetch';
import { useAuth } from '../hook/useAuth';

function LoginPage() {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/main" />;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const login = form.login.value;
    const password = form.password.value;
    const body = { login: login, password: password };
    if (token === null) {
      const response = await loginUser(body);
      localStorage.setItem('token', response.token);
      token = response.token;
    }
    dispatch({
      type: 'user',
      data: {
        username: state.username,
        login: login,
        token: token,
        id: state.id,
      },
    });
    navigate('/main');
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
          <input name="password" type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export { LoginPage };
