import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Sign In': 'Sign In',
      'Sign Up': 'Sign Up',
      'Sign Out': 'Sign Out',
      'Lets try!': 'Lets try!',
      Main: 'Main',
      Demo: 'Demo',
      'Our project management app allows users to centrally manage tasks and their timely completion. Trackers are widely used in project management, because they allow you to easily monitor all work processes and control the work of the team':
        'Our project management app allows users to centrally manage tasks and their timely completion. Trackers are widely used in project management, because they allow you to easily monitor all work processes and control the work of the team',
      'Darya Usova': 'Darya Usova',
      'Semion Krapivin': 'Semion Krapivin',
      'Edit Profile': 'Edit Profile',
      'Team task manager app': 'Team task manager app',
      Login: 'Login',
      Password: 'Password',
      Name: 'Name',
      Registration: 'Registration',
      'Create account': 'Create account',
      Back: 'Back',
      'Login page': 'Login page',
      'Current name': 'Current name',
      'Current login': 'Current login',
      'Change user data': 'Change user data',
      'Main page': 'Main page',
      'Profile Page': 'Profile Page',
      'Delete account': 'Delete account',
      'Page Not Found': 'Page Not Found',
      'Delete current user': 'Delete current user',
      Confirm: 'Confirm',
      'create Board': 'Create Board',
      'to Board': 'to Board',
      Board: 'Board',
      'Create column': 'Create column',
      'Delete current board': 'Delete current board',
      'Created an authorization process, fetching using backend API, Profile page, Boards component, Modal component, localization. ':
        'Created an authorization process, fetching using backend API, Profile page, Boards component, Modal component, localization. ',
      'Developed design, HTML, CSS layouts of components, Board component, 404 component, Welcome component, recorded final video and deploy. ':
        'Developed design, HTML, CSS layouts of components, Board component, 404 component, Welcome component, recorded final video and deploy. ',
    },
  },
  ru: {
    translation: {
      'Sign In': 'Войти',
      'Sign Up': 'Регистрация',
      'Sign Out': 'Выйти',
      'Lets try!': 'Попробовать!',
      Main: 'Главная',
      Demo: 'Демо',
      'Our project management app allows users to centrally manage tasks and their timely completion. Trackers are widely used in project management, because they allow you to easily monitor all work processes and control the work of the team':
        'Наше приложение для управления проектами позволяет пользователям централизованно управлять задачами и их своевременным выполнением. Трекеры широко используются в управлении проектами, поскольку позволяют легко отслеживать все рабочие процессы и контролировать работу команды.',
      'Darya Usova': 'Дарья Усова',
      'Semion Krapivin': 'Семён Крапивин',
      'Edit Profile': 'Профиль',
      'Team task manager app': 'Приложение для управления задачами команды',
      Login: 'Войти',
      Password: 'Пароль',
      Name: 'Имя',
      Registration: 'Регистрация',
      'Create account': 'Создать учетную запись',
      Back: 'Назад',
      'Login page': 'Страница входа',
      'Current name': 'Текущее имя',
      'Current login': 'Текущий логин',
      'Change user data': 'Изменить данные пользователя',
      'Main page': 'Главная',
      'Profile Page': 'Страница профиля',
      'Delete account': 'Удалить аккаунт',
      'Page Not Found': 'Страница не найдена',
      'Delete current user': 'Удалить текущего пользователя',
      Confirm: 'Подтвердить',
      'create Board': 'Создать Доску',
      'to Board': 'Перейти',
      'Create column': 'Создать колонку',
      'Delete current board': 'Удалить Доску',
      Board: 'Доска',
      'Created an authorization process, fetching using backend API, Profile page, Boards component, Modal component, localization. ':
        'Работала с процессом авторизации и аутентификации, установкой backend и взаимодействием с API. Создала страницу Профиля, Общую страницу досок, Модальный компонент, перевод.',
      'Developed design, HTML, CSS layouts of components, Board component, 404 component, Welcome component, recorded final video and deploy. ':
        'Разработал дизайн, вёрстку и стилизацию компонентов, компонент Доски, компонент 404, приветственную страницу. Записал демо-видео и произвёл деплой проекта.',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
