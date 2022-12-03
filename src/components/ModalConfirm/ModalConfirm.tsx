import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { deleteBoard, deleteColumn } from '../../utils/fetch';
import { PropsModalConfirm } from '../../utils/types';
import styles from './ModalConfirm.module.css';

export function ModalConfirm(props: PropsModalConfirm) {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
        {props.columnId !== 'deleteBoard' && (
          <div className={styles.message__wrapper}>
            {t('Delete column')}?
            <button className={styles.confirm__delete} onClick={handleDeleteColumn}>
              {t('Confirm')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ModalConfirm;
