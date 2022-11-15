import { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUser } from '../../utils/fetch';
import { useAuth } from '../hook/useAuth';

export function RegisstrationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.username.value;
    const login = form.login.value;
    const password = form.password.value;
    console.log(e.currentTarget.username.value);
    const body = { name: name, login: login, password: password };
    createUser(body);
    signUp(login, () => navigate('/', { replace: true }));
  };

  return (
    <>
      <div>Register page</div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="username" />
        </label>
        <label>
          Login:
          <input name="login" />
        </label>
        <label>
          Password:
          <input name="password" />
        </label>
        <button type="submit">Create account</button>
      </form>
    </>
  );
}
