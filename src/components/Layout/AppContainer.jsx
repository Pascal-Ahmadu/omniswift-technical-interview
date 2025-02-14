import { Box } from '@mui/material';

export const AppContainer = ({ children }) => (
  <Box
    sx={{
      p: { xs: 1, sm: 2, md: 3 },
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      overflow: 'hidden'
    }}
  >
    {children}
  </Box>
);
