import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../utils/fetch';
import { useAuth } from '../hook/useAuth';

export function RegistrationPage() {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.username.value;
    const login = form.login.value;
    const password = form.password.value;
    const body = { name: name, login: login, password: password };
    const response = await createUser(body);
    dispatch({
      type: 'user',
      data: {
        username: name,
        login: login,
        token: null,
        id: response._id,
      },
    });
    navigate('/login');
  }

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
          <input name="password" type="password" />
        </label>
        <button type="submit">Create account</button>
      </form>
    </>
  );
}
