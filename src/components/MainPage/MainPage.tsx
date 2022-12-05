import { useEffect, useState } from 'react';
import { createBoard, getBoards } from '../../utils/fetch';
import { Boards } from '../../utils/types';
import BoardsItem from '../BoardsItem/BoardsItem';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './MainPage.module.css';

function MainPage() {
  const [apiData, setApiData] = useState<Boards[]>([]);
  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('id') || '';

  const handleGetBoards = async () => {
    try {
      const response = await getBoards(token);
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
      const nextBoardNumber = Number(apiData[apiData.length - 1].title.toString().slice(7));
      const body = {
        title: `Board #${nextBoardNumber + 1}`,
        owner: currentUser,
        users: [currentUser],
      };
      const response = await createBoard(body, token);
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
      <section className={styles.main__section}>
        <div className={styles.boards__wrapper}>
          {apiData.map((item) => (
            <BoardsItem key={item._id} item={item} />
          ))}
        </div>

        <section>
          <button className={styles.create} onClick={handleCreateBoard}>
            create Board
          </button>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default MainPage;
