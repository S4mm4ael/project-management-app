import { FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/fetch';
import { useAuth } from '../hook/useAuth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginInputs } from '../../utils/types';

function LoginPage() {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  let token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/main" />;
  }

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const login = data.login;
    const password = data.password;
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
  };

  return (
    <>
      <div>Login page</div>
      <Link to="/register">Register</Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Login:
          <input
            {...register('login', {
              required: 'Login is required',
              maxLength: { value: 20, message: 'Login is too long' },
              minLength: { value: 3, message: 'Login is too short' },
            })}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            {...register('password', {
              minLength: { value: 6, message: 'Password is too short' },
              maxLength: { value: 25, message: 'Password is too long' },
              pattern: {
                value: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,25}/,
                message:
                  'Password should contain at least one special character (!@#$%^&*), digit and letter',
              },
            })}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export { LoginPage };
