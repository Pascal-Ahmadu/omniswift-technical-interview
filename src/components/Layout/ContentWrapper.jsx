import { Box } from '@mui/material';

export const ContentWrapper = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      maxWidth: '100%',
      overflow: 'auto',
      '& > *': {
        width: {
          xs: 'calc(100vw - 16px)',
          sm: 'calc(100vw - 32px)',
          md: '1145px'
        },
        mx: 'auto'
      }
    }}
  >
    {children}
  </Box>
);