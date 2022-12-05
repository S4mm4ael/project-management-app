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
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import { useTranslation } from 'react-i18next';

function Board() {
  const { t } = useTranslation();
  const [apiData, setApiData] = useState<Boards>();
  const [columnApiData, setColumnApiData] = useState<Columns[]>([]);
  const boardId = localStorage.getItem('currentBoardId');
  const token = localStorage.getItem('token');
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [responseError, setResponseError] = useState('');

  const tfn = ['Todo', 'In Progress', 'Blocked', 'Completed', 't1', 't2', 't3', 't4', 't5', 't6'];

  const handleGetBoard = async () => {
    try {
      const response = await getBoard(token, boardId);
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
      setApiData(response);
    } catch (error) {
      console.log(error);
    }
    handleGetColumns();
  };

  const handleGetColumns = async () => {
    try {
      const response = await getColumns(token, boardId);
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
        title: 'New column',
        order: 0,
      };
      const response = await createColumn(body, token, boardId);
      if (response.status > 399) {
        throw new Error(`Something went wrong... Error code: ${response.status}`);
      }
      return response;
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
          <div className={styles.board__header}>
            <Link to="/main">
              <button className={styles.back__button}>Back</button>
            </Link>
            <button
              className={styles.create__button}
              onClick={() => {
                handleCreateColumn();
                handleGetColumns();
              }}
            >
              {t('Create column')}
            </button>
            <h2 className={styles.board__title}>
              {t('Board')} {apiData?.title}
            </h2>
          </div>

          <DndProvider backend={HTML5Backend}>
            <Container display="flex" maxWidth="auto" gap={5} overflowX="scroll" py={8} minH={670}>
              {columnApiData.map((item, index) => (
                <Column
                  key={item._id}
                  column={tfn[index] as ColumnType}
                  item={item}
                  boardId={boardId}
                  columnId={columnApiData[index]._id}
                  title={columnApiData[index].title}
                  handleGetColumns={handleGetBoard}
                />
              ))}
            </Container>
          </DndProvider>
        </section>
        <ModalConfirm
          token={token}
          active={activeModal}
          setActive={setActiveModal}
          setError={setResponseError}
          boardId={boardId}
          columnId={'deleteBoard'}
          handleGetColumns={handleGetColumns}
        />
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default Board;
