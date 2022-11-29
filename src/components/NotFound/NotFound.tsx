import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function NotFound() {
  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 'calc(100vh - 160px)',
          fontSize: '2rem',
        }}
      >
        <p>NotFound!</p>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
