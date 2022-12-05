import { useEffect, useState } from 'react';
import { createBoard, getBoards } from '../../utils/fetch';
import { Boards } from '../../utils/types';
import BoardsItem from '../BoardsItem/BoardsItem';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './MainPage.module.css';
import { useTranslation } from 'react-i18next';

function MainPage() {
  const { t } = useTranslation();
  const [apiData, setApiData] = useState<Boards[]>([]);
  const [confirm, setConfirm] = useState(false);
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
  function handleConfirm() {
    setConfirm(!confirm);
  }

  useEffect(() => {
    handleGetBoards();
  }, [confirm]);

  const handleCreateBoard = async () => {
    try {
      let nextBoardNumber;
      apiData.length === 0
        ? (nextBoardNumber = 1)
        : (nextBoardNumber = Number(apiData[apiData.length - 1].title.toString()) + 1);
      const body = {
        title: `${nextBoardNumber}`,
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
            <BoardsItem
              key={item._id}
              item={item}
              token={token}
              handleGetColumns={handleGetBoards}
              handleConfirm={handleConfirm}
            />
          ))}
        </div>
        <section>
          <button className={styles.create} onClick={handleCreateBoard}>
            {t('create Board')}
          </button>
        </section>
      </section>
      <Footer />
    </>
  );
}

export default MainPage;
