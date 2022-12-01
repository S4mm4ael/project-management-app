import { Link } from 'react-router-dom';
import { Boards } from '../../utils/types';

function BoardsItem(props: { item: Boards }) {
  function handleToBoard() {
    localStorage.setItem('currentBoardId', props.item._id);
  }

  return (
    <div>
      {props.item._id} - {props.item.title}
      <Link to="/board">
        <button onClick={handleToBoard}>to Board</button>
      </Link>
    </div>
  );
}

export default BoardsItem;
