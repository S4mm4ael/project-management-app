import { title } from 'process';
import React, { useState } from 'react';
import styles from './Boards.module.css';
import { IBoard } from './IBoards';

function Boards(): JSX.Element {
  const initialArray = [
    {
      id: 1,
      title: 'Todo',
      items: [
        { id: 1, title: 'Go shopping' },
        { id: 2, title: 'Go to cinema' },
        { id: 3, title: 'Go to friends' },
      ],
    },
    {
      id: 1,
      title: 'In progress',
      items: [
        { id: 1, title: 'Go shopping' },
        { id: 2, title: 'Go to cinema' },
        { id: 3, title: 'Go to friends' },
      ],
    },
    {
      id: 1,
      title: 'Completed',
      items: [
        { id: 1, title: 'Go shopping' },
        { id: 2, title: 'Go to cinema' },
        { id: 3, title: 'Go to friends' },
      ],
    },
  ];

  const [boards, setBoards] = useState(initialArray);

  type HeaderProps = {
    children: React.ReactNode;
  };

  function renderBoards(boards: HeaderProps) {
    return boards.map((board: IBoard) => {
      <div className={styles.board}>
        <div className={styles.board__title}>{board.title}</div>
        {board.items.map((item) => {
          <div className={styles.item}>{item.title}</div>;
        })}
      </div>;
    });
  }

  return (
    <>
      <div className={styles.boards__wrapper}>{renderBoards()}</div>
    </>
  );
}

export default Boards;
