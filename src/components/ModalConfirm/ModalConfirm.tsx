import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { deleteBoard, deleteColumn, deleteUser } from '../../utils/fetch';
import { PropsModalConfirm } from '../../utils/types';
import { clearLocalStorage } from '../../utils/utils';
import { useAuth } from '../hook/useAuth';
import styles from './ModalConfirm.module.css';

export function ModalConfirm(props: PropsModalConfirm) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, dispatch] = useAuth();

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn(props.token, props.boardId, props.columnId);
    } catch (error) {
      console.log(error);
    }
    props.handleGetColumns();
  };

  const handleDeleteBoard = async () => {
    try {
      const response = await deleteBoard(props.token, props.boardId);
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
      navigate('/main');
    } catch (error) {
      console.log(error);
    }
  };

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
        {props.columnId === 'deleteBoard' && (
          <div className={styles.message__wrapper}>
            {t('Delete current board')}?
            <button className={styles.confirm__delete} onClick={handleDeleteBoard}>
              {t('Confirm')}
            </button>
          </div>
        )}
        {props.columnId !== 'deleteBoard' && props.columnId !== 'deleteUser' && (
          <div className={styles.message__wrapper}>
            {t('Delete column')}?
            <button className={styles.confirm__delete} onClick={handleDeleteColumn}>
              {t('Confirm')}
            </button>
          </div>
        )}
        {props.columnId === 'deleteUser' && (
          <div className={styles.message__wrapper}>
            {t('Delete current user')}?
            <button className={styles.confirm__delete} onClick={handleDeleteAccount}>
              {t('Confirm')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ModalConfirm;
