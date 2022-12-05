import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Boards } from '../../utils/types';
import styles from './BoardsItem.module.css';
import ModalConfirm from '../ModalConfirm/ModalConfirm';

function BoardsItem(props: {
  item: Boards;
  token: string | null;
  handleGetColumns: () => Promise<void>;
}) {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [responseError, setResponseError] = useState('');
  const boardId = props.item._id;
  const token = props.token;
  const handleGetBoards = props.handleGetColumns;
  function handleToBoard() {
    localStorage.setItem('currentBoardId', props.item._id);
  }

  return (
    <>
      <div className={styles.boards__item}>
        <b>{props.item.title}</b>
        <Link to="/board">
          <button onClick={handleToBoard} style={{ backgroundColor: '#99A33B' }}>
            to Board
          </button>
        </Link>
        <button style={{ backgroundColor: '#E53E3E' }} onClick={() => setActiveModal(true)}>
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
      />
    </>
  );
}

export default BoardsItem;
