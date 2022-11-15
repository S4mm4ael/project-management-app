import { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../../utils/fetch';
import { useAuth } from '../hook/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const fromPage = location.state.from.pathname || '/';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const user = form.username.value;
    const password = form.password.value;
    console.log(e.currentTarget.username.value);
    const body = { login: user, password: password };
    loginUser(body);
    signIn(user, () => navigate(fromPage, { replace: true }));
  };

  return (
    <>
      <div>Login page</div>
      <Link to="/register">Register</Link>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="username" />
        </label>
        <label>
          Password:
          <input name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export { LoginPage };
