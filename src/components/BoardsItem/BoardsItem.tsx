import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Boards } from '../../utils/types';
import styles from './BoardsItem.module.css';

function BoardsItem(props: { item: Boards }) {
  const [activeModal, setActiveModal] = useState<boolean>(false);
  function handleToBoard() {
    localStorage.setItem('currentBoardId', props.item._id);
  }

  return (
    <div className={styles.boards__item}>
      <b>{props.item.title}</b>
      <Link to="/board">
        <button onClick={handleToBoard} style={{ backgroundColor: '#99A33B' }}>
          to Board
        </button>
      </Link>
    </div>
  );
}

export default BoardsItem;
