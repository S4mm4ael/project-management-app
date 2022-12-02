import { ChakraProvider, Container, theme } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { Link } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../Column/Column';
import { ColumnType } from '../../utils/enums';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Board.module.css';
import { createColumn, getBoard, getColumns } from '../../utils/fetch';
import { useEffect, useState } from 'react';
import { Boards, Columns } from '../../utils/types';

function Board() {
  const [apiData, setApiData] = useState<Boards>();
  const [columnApiData, setColumnApiData] = useState<Columns[]>([]);
  const boardId = localStorage.getItem('currentBoardId');
  const token = localStorage.getItem('token');

  const handleGetBoard = async () => {
    try {
      const response = await getBoard(token, boardId);
      //console.log(response);
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
      setApiData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetColumns = async () => {
    try {
      const response = await getColumns(token, boardId);
      console.log(response);
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
      setColumnApiData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateColumn = async () => {
    try {
      const body = {
        title: 'Column #4',
        order: 3,
      };
      const response = await createColumn(body, token, boardId);
      // console.log(response);
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
    handleGetColumns();
  };

  useEffect(() => {
    handleGetBoard();
    handleGetColumns();
  }, []);
  /*
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
  );*/
  return (
    <>
      <ChakraProvider theme={theme}>
        <Header />

        <section className={styles.board__section}>
          <Link to="/main">
            <button className={styles.back__button}>Back</button>
          </Link>
          Board Title: {apiData?.title}
          <button
            onClick={() => {
              handleCreateColumn();
              handleGetColumns();
            }}
            style={{ backgroundColor: '#99A33B' }}
          >
            createColumn
          </button>
          <DndProvider backend={HTML5Backend}>
            <Container display="flex" gap={5} maxWidth="container.lg" overflowX="scroll" py={8}>
              {columnApiData.map((item, index) => (
                <Column
                  key={item._id}
                  column={ColumnType.TO_DO}
                  item={item}
                  boardId={boardId}
                  columnId={columnApiData[index]._id}
                  title={columnApiData[index].title}
                  handleGetColumns={handleGetColumns}
                />
              ))}
            </Container>
          </DndProvider>
        </section>

        <Footer />
      </ChakraProvider>
    </>
  );
}

export default Board;
