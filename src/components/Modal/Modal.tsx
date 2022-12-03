import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../utils/fetch';
import { PropsModal } from '../../utils/types';
import { clearLocalStorage } from '../../utils/utils';
import { useAuth } from '../hook/useAuth';
import styles from './Modal.module.css';

export function Modal(props: PropsModal) {
  const [state, dispatch] = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleDeleteAccount() {
    try {
      const response = await deleteUser(state.id, state.token);
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
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
    } catch (error) {
      props.setError('Error');
    }
  }

  return (
    <div
      className={props.active ? `${styles.modal} ${styles.active}` : `${styles.modal}`}
      onClick={() => props.setActive(false)}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.close} onClick={() => props.setActive(false)}>
          X
        </div>
        <div className={styles.message__wrapper}>
          {t('Delete current user')}?
          <button className={styles.confirm__delete} onClick={handleDeleteAccount}>
            {t('Confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
