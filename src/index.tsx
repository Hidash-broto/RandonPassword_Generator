import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import App from './App';

const theme = createTheme();

console.log(theme.breakpoints.values);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </ThemeProvider>
);
