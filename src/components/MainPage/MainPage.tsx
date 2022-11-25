import { ChakraProvider } from '@chakra-ui/react';
import theme from '../../config/theme';
import Boards from '../Boards/Boards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function MainPage() {
  return (
    <ChakraProvider theme={theme}>
      <Header />

      <section className="boards__section">
        <Boards />
      </section>
      <Footer />
    </ChakraProvider>
  );
}

export default MainPage;
