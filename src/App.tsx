import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/hoc/AuthProvider';
import RequireAuth from './components/hoc/RequireAuth';
import { LoginPage } from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import { RegistrationPage } from './components/RegistrationPage/RegistrationPage';
import WelcomePage from './components/WelcomePage/WelcomePage';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
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
