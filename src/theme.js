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
    // Add new typography variants for the select component
    selectLabel: {
      fontFamily: 'Lato',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '0.4px',
    },
    selectText: {
      fontFamily: 'Lato',
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0.44px',
    },
  },
  components: {
    // Add custom component styles
    MuiFormControl: {
      styleOverrides: {
        root: {
          height: '64px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#343434',
          '&.Mui-focused': {
            color: '#343434',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ADB7BE',
            borderWidth: '1px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ADB7BE',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ADB7BE',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#ADB7BE',
        },
      },
    },
  },
});

export default theme;