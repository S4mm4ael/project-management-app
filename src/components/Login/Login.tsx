import { FormEvent, SyntheticEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  const fromPage = location.state.from.pathname || '/';

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const user = form.username.value;
    console.log(e.currentTarget.username.value);
    signIn(user, () => navigate(fromPage, { replace: true }));
  };

  return (
    <>
      <div>Login page</div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="username" />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export { Login };
