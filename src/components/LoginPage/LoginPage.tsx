import { Link, Navigate } from 'react-router-dom';
import { getUsers, loginUser } from '../../utils/fetch';
import { useAuth } from '../hook/useAuth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginInputs, User } from '../../utils/types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../LoginPage/LoginPage.module.css';

function LoginPage() {
  const [, dispatch] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const [responseError, setResponseError] = useState('');
  const { t } = useTranslation();

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
      <section className={styles.login__section}>
        <div className={styles.login__wrapper}>
          <h2>{t('Login page')}</h2>

          <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
            <label>
              {t('Login')}:
              <input
                {...register('login', {
                  required: 'Login is required',
                })}
              />
              {errors.login && <p className={styles.input__error}>{errors.login.message}</p>}
            </label>
            <label>
              {t('Password')}:
              <input
                type="password"
                autoComplete="on"
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              {errors.password && <p className={styles.input__error}>{errors.password.message}</p>}
            </label>
            <div className={styles.buttons__wrapper}>
              <button className={styles.confirm} type="submit">
                {t('Login')}
              </button>
              <Link to="/register">
                <button className={styles.register}>{t('Registration')}</button>
              </Link>
              <Link to="/">
                <button className={styles.main}>{t('Back')}</button>
              </Link>
              {responseError && <p className={styles.input__error}>{responseError}</p>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export { LoginPage };
