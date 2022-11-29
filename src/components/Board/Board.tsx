import {} from '@chakra-ui/icons';
import { ChakraProvider, Container, SimpleGrid, theme } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { Link } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../Column/Column';
import { ColumnType } from '../../utils/enums';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Board.module.css';

function Board() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Header />

        <section className={styles.board__section}>
          <Link to="/">
            <button className={styles.back__button}>Main</button>
          </Link>
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
