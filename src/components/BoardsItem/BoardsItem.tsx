import { Link } from 'react-router-dom';
import { Boards } from '../../utils/types';

function BoardsItem(props: { item: Boards }) {
  function handleToBoard() {
    localStorage.setItem('currentBoardId', props.item._id);
  }

  return (
    <div>
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
