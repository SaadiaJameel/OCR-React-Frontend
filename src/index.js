import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import colors from './Components/ColorPalete';
import './index.css';
import App from './App';

const theme = createTheme({
  palette: colors,
  components:{
    MuiToolbar: {
    styleOverrides: {
      regular: {
        height: "50px !important",
        minHeight: "50px !important",
        "@media (min-width: 600px)": {
          minHeight: "50px",
        }
      },
    },
  },}
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </React.StrictMode>
);
