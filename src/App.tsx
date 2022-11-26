import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/hoc/AuthProvider';
import RequireAuth from './components/hoc/RequireAuth';
import { LoginPage } from './components/LoginPage/LoginPage';
import MainPage from './components/MainPage/MainPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { RegistrationPage } from './components/RegistrationPage/RegistrationPage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import i18n from './i18n';

function App() {
  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang')?.toString();
    i18n.changeLanguage(lang);
  } else {
    localStorage.setItem('lang', 'en');
  }
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
          <Route
            path="profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
