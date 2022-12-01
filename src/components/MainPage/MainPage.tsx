import { useEffect, useState } from 'react';
import { createBoard, getBoards } from '../../utils/fetch';
import { Boards } from '../../utils/types';
import BoardsItem from '../BoardsItem/BoardsItem';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function MainPage() {
  const [apiData, setApiData] = useState<Boards[]>([]);
  const token = localStorage.getItem('token');

  const handleGetBoards = async () => {
    try {
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

  useEffect(() => {
    handleGetBoards();
  }, []);

  const handleCreateBoard = async () => {
    try {
      const body = {
        title: 'Board #7',
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
    handleGetBoards();
  };

  return (
    <>
      <Header />
      {apiData.map((item) => (
        <BoardsItem key={item._id} item={item} />
      ))}
      <section className="main__section">
        <button onClick={handleGetBoards} style={{ backgroundColor: '#99A33B' }}>
          getBoards
        </button>
        <button onClick={handleCreateBoard} style={{ backgroundColor: '#99A33B' }}>
          createBoard
        </button>
      </section>
      <Footer />
    </>
  );
}

export default MainPage;
