// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {

    fontFamily: 'Lato, sans-serif',
    
    body1: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '0.1px',
    },
    
    body2: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '0.1px',
    },
    button: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '0.1px',
      textTransform: 'none',
    },
    
  },
});

export default theme;
