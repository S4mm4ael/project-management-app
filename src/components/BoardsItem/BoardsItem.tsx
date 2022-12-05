import { Link } from 'react-router-dom';
import { Boards } from '../../utils/types';
import { useTranslation } from 'react-i18next';

function BoardsItem(props: { item: Boards }) {
  const { t } = useTranslation();
  function handleToBoard() {
    localStorage.setItem('currentBoardId', props.item._id);
  }

  return (
    <div>
      <b>
        {t('Board')} {props.item.title}
      </b>
      <Link to="/board">
        <button onClick={handleToBoard} style={{ backgroundColor: '#99A33B' }}>
          {t('to Board')}
        </button>
      </Link>
    </div>
  );
}

export default BoardsItem;
