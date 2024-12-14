/** @format */

import ReactDOM from 'react-dom/client'; // Updated import
import App from './App.tsx';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  typography: {
    h1: {
      fontSize: '2rem',
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#2c3e50',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    h1: {
      fontSize: '2rem',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#2c3e50',
    },
    background: {
      default: '#121212',
      paper: '#333',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
});

const rootElement = document.getElementById('root');

if (rootElement) {
  // Updated rendering method for React 18
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
  );
}
