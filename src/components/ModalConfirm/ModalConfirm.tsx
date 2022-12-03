import { useTranslation } from 'react-i18next';
import { deleteColumn } from '../../utils/fetch';
import { PropsModalConfirm } from '../../utils/types';
import styles from './ModalConfirm.module.css';

export function ModalConfirm(props: PropsModalConfirm) {
  const { t } = useTranslation();

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn(props.token, props.boardId, props.columnId);
    } catch (error) {
      console.log(error);
    }
    props.handleGetColumns();
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
        <div className={styles.message__wrapper}>
          {t('Delete column')}?
          <button className={styles.confirm__delete} onClick={handleDeleteColumn}>
            {t('Confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ModalConfirm;
