import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'Sign In': 'Sign In',
      'Sign Up': 'Sign Up',
      'Sign Out': 'Sign Out',
      'Lets try!': 'Lets try!',
      Demo: 'Demo',
      'Our project management app allows users to centrally manage tasks and their timely completion. Trackers are widely used in project management, because they allow you to easily monitor all work processes and control the work of the team':
        'Our project management app allows users to centrally manage tasks and their timely completion. Trackers are widely used in project management, because they allow you to easily monitor all work processes and control the work of the team',
      'Darya Usova': 'Darya Usova',
      'Semion Krapivin': 'Semion Krapivin',
    },
  },
  ru: {
    translation: {
      'Sign In': 'Войти',
      'Sign Up': 'Регистрация',
      'Sign Out': 'Выйти',
      'Lets try!': 'Попробовать!',
      Demo: 'Демо',
      'Our project management app allows users to centrally manage tasks and their timely completion. Trackers are widely used in project management, because they allow you to easily monitor all work processes and control the work of the team':
        'Наше приложение для управления проектами позволяет пользователям централизованно управлять задачами и их своевременным выполнением. Трекеры широко используются в управлении проектами, поскольку позволяют легко отслеживать все рабочие процессы и контролировать работу команды.',
      'Darya Usova': 'Дарья Усова',
      'Semion Krapivin': 'Семён Крапивин',
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
