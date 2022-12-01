import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, putUser } from '../../utils/fetch';
import { RegistrationInputs } from '../../utils/types';
import { clearLocalStorage, setLocalStorage } from '../../utils/utils';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useAuth } from '../hook/useAuth';
import { Modal } from '../Modal/Modal';
import styles from './Profile.module.css';

function ProfilePage() {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInputs>();
  const [responseError, setResponseError] = useState('');
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const { t } = useTranslation();

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

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    const name = data.name;
    const login = data.login;
    const password = data.password;
    const body = { name: name, login: login, password: password };
    try {
      const response = await putUser(state.id, state.token, body);
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
      const responseToken = await loginUser({ login, password });
      if (responseToken.status > 399) {
        throw new Error(`Something went wrong... Error code: ${responseToken.status}`);
      }
      dispatch({
        type: 'user',
        data: {
          username: name,
          login: login,
          token: responseToken.token,
          id: state.id,
        },
      });
      setLocalStorage(responseToken.token, name, login, response._id);
      navigate('/login');
    } catch (error) {
      setResponseError('Error');
    }
  };

  function changeActive() {
    setActiveModal(!activeModal);
  }

  return (
    <>
      <Header />
      <section className={styles.profile__section}>
        <div className={styles.profile__wrapper}>
          <h2>{t('Profile Page')}</h2>
          <div className={styles.button__container}>
            <button className={styles.sign__out} onClick={handleLogOut}>
              {t('Sign Out')}
            </button>
            <button className={styles.delete} onClick={changeActive}>
              {t('Delete account')}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {t('Current name')}: <b>{state.username}</b>
            <label>
              {t('Name')}:
              <input
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name is too short' },
                  maxLength: { value: 20, message: 'Name is too long' },
                  pattern: {
                    value: /[a-zA-Z\s-]{2,25}/,
                    message:
                      'Name should contain only letters, whitespace caracters or "-" character',
                  },
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </label>
            {t('Current login')}: <b>{state.login}</b>
            <label>
              {t('Login')}:
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
              {t('Password')}:
              <input
                type="password"
                autoComplete="on"
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
            <button type="submit" className={styles.change}>
              {t('Change user data')}
            </button>
          </form>
          {responseError && <p>{responseError}</p>}
          <Modal active={activeModal} setActive={setActiveModal} setError={setResponseError} />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProfilePage;
