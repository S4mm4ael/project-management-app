import { Link, Navigate } from 'react-router-dom';
import { getUsers, loginUser } from '../../utils/fetch';
import { useAuth } from '../hook/useAuth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginInputs, User } from '../../utils/types';
import { useState } from 'react';

function LoginPage() {
  const [, dispatch] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const [responseError, setResponseError] = useState('');

  let token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/main" />;
  }

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const login = data.login;
    const password = data.password;
    const body = { login: login, password: password };
    let thisUserData = [];
    if (token === null) {
      try {
        const response = await loginUser(body);
        localStorage.setItem('token', response.token);
        token = response.token;
        if (response.status !== 200) {
          throw new Error(`Something went wrong... Error code: ${response.status}`);
        }
      } catch (error) {
        setResponseError('Wrong login or password');
      }
    }
    try {
      const token = localStorage.getItem('token');
      const responseAllUsers = await getUsers(token);
      thisUserData = responseAllUsers.filter((user: User) => user.login === login);
      console.log(thisUserData[0]);
      localStorage.setItem('name', thisUserData[0].name);
      localStorage.setItem('login', thisUserData[0].login);
      localStorage.setItem('id', thisUserData[0]._id);
      if (responseAllUsers.status > 399) {
        throw new Error(`Something went wrong... Error code: ${responseAllUsers.status}`);
      }
      dispatch({
        type: 'user',
        data: {
          username: thisUserData[0].name,
          login: thisUserData[0].login,
          token: localStorage.getItem('token'),
          id: thisUserData[0]._id,
        },
      });
    } catch (error) {
      setResponseError('Wrong login or password');
    }
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
            })}
          />
          {errors.login && <p>{errors.login.message}</p>}
        </label>
        <label>
          Password:
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <button type="submit">Login</button>
        {responseError && <p>{responseError}</p>}
      </form>
    </>
  );
}

export { LoginPage };
