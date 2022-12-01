import { ChakraProvider, Container, SimpleGrid, theme } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { Link } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../Column/Column';
import { ColumnType } from '../../utils/enums';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Board.module.css';
import { getBoard } from '../../utils/fetch';
import { useEffect, useState } from 'react';
import { Boards } from '../../utils/types';

function Board() {
  const [apiData, setApiData] = useState<Boards>();
  const boardId = localStorage.getItem('currentBoardId');
  const token = localStorage.getItem('token');

  const handleGetBoard = async () => {
    try {
      const response = await getBoard(token, boardId);
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
    handleGetBoard();
  }, []);

  return (
    <>
      <ChakraProvider theme={theme}>
        <Header />

        <section className={styles.board__section}>
          <Link to="/main">
            <button className={styles.back__button}>Back</button>
          </Link>
          Board Title: {apiData?.title}
          <DndProvider backend={HTML5Backend}>
            <Container maxWidth="container.lg" px={4} py={8}>
              <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
                <Column column={ColumnType.TO_DO} />
                <Column column={ColumnType.IN_PROGRESS} />
                <Column column={ColumnType.BLOCKED} />
                <Column column={ColumnType.COMPLETED} />
              </SimpleGrid>
            </Container>
          </DndProvider>
        </section>

        <Footer />
      </ChakraProvider>
    </>
  );
}

export default Board;
