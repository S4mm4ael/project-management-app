import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Boards } from '../../utils/types';
import { useTranslation } from 'react-i18next';
import styles from './BoardsItem.module.css';
import ModalConfirm from '../ModalConfirm/ModalConfirm';

function BoardsItem(props: {
  item: Boards;
  token: string | null;
  handleGetColumns: () => Promise<void>;
  handleConfirm: () => void;
}) {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [responseError, setResponseError] = useState('');
  const boardId = props.item._id;
  const token = props.token;
  const { t } = useTranslation();
  const handleGetBoards = props.handleGetColumns;

  function handleToBoard() {
    localStorage.setItem('currentBoardId', props.item._id);
  }

  return (
    <>
      <div className={styles.boards__item}>
        <b>
          {t('Board')} {props.item.title}
        </b>
        <Link to="/board">
          <button onClick={handleToBoard} style={{ backgroundColor: '#99A33B' }}>
            {t('to Board')}
          </button>
        </Link>
        <button
          className={styles.delete__button}
          onClick={() => {
            setActiveModal(true);
            handleToBoard();
          }}
        >
          Delete board
        </button>
      </div>
      <ModalConfirm
        token={token}
        active={activeModal}
        setActive={setActiveModal}
        setError={setResponseError}
        boardId={boardId}
        columnId={'deleteBoard'}
        handleGetColumns={handleGetBoards}
        handleConfirm={props.handleConfirm}
      />
    </>
  );
}

export default BoardsItem;
