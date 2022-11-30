import { useState } from 'react';
import { createBoard, getBoards } from '../../utils/fetch';
import { Boards } from '../../utils/types';
import Board from '../Board/Board';
import BoardsItem from './BoardsItem';

function MainPage() {
  const [apiData, setApiData] = useState<Boards[]>([
    { id: '1', title: '213', owner: 'Sammily', users: ['Sammily', 'Sam'] },
  ]);
  const handleGetBoards = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getBoards(token);
      console.log(response);
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
      setApiData(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateBoard = async () => {
    try {
      const token = localStorage.getItem('token');
      const body = {
        title: 'Board #3',
        owner: '6373c57e7e75c1eff01df431',
        users: ['6373c57e7e75c1eff01df431'],
      };
      const response = await createBoard(body, token);
      console.log(response);
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="main__section">
      <ul>
        {apiData.map((item, index) => (
          <BoardsItem key={item.id + index.toString()} title={item.title} />
        ))}
      </ul>
      <button onClick={handleGetBoards}>getBoards</button>
      <button onClick={handleCreateBoard}>createBoard</button>
      <Board />
    </section>
  );
}

export default MainPage;
