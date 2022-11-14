import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/hoc/AuthProvider';
import RequireAuth from './components/hoc/RequireAuth';
import { Login } from './components/Login/Login';
import MainPage from './components/MainPage/MainPage';
import WelcomePage from './components/WelcomePage/WelcomePage';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="login" element={<Login />} />
          <Route
            path="main"
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
