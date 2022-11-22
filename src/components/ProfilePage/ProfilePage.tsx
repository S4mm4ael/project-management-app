import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, getUsers, putUser } from '../../utils/fetch';
import { RegistrationInputs, User } from '../../utils/types';
import { clearLocalStorage } from '../../utils/utils';
import { useAuth } from '../hook/useAuth';

function ProfilePage() {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInputs>();
  const [responseError, setResponseError] = useState('');

  async function getUserData() {
    const token = localStorage.getItem('token');
    const responseAllUsers = await getUsers(token);
    const thisUserData = responseAllUsers.filter((user: User) => user.token === token);
    console.log(state);
  }

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

  function getState() {
    console.log(state);
  }

  function handleDeleteAccount() {
    console.log('delete');
  }

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    const name = data.name;
    const login = data.login;
    const password = data.password;
    const body = { name: name, login: login, password: password };
    try {
      const response = await putUser('1');
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
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
    } catch (error) {
      setResponseError('User with this login already exists');
    }
  };

  getUserData();
  return (
    <>
      <div>Profile Page</div>
      <Link to="/main">
        <button>Main page</button>
      </Link>
      <button onClick={handleLogOut}>Log out</button>
      <button onClick={handleDeleteAccount}>Delete account</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name is too short' },
              maxLength: { value: 20, message: 'Name is too long' },
              pattern: {
                value: /[a-zA-Z\s-]{2,25}/,
                message: 'Name should contain only letters, whitespace caracters or "-" character',
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>
        <label>
          Login:
          <input
            {...register('login', {
              required: 'Login is required',
              maxLength: { value: 20, message: 'Login is too long' },
              minLength: { value: 3, message: 'Login is too short' },
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
              minLength: { value: 6, message: 'Password is too short' },
              maxLength: { value: 25, message: 'Password is too long' },
              pattern: {
                value: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,25}/,
                message:
                  'Password should contain at least one special character (!@#$%^&*), digit and letter',
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <button type="submit">Change user data</button>
      </form>
      {responseError && <p>{responseError}</p>}
      <button onClick={getState}>State</button>
    </>
  );
}

export default ProfilePage;
