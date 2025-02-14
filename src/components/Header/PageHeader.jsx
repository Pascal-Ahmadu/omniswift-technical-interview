import { Typography, useTheme, useMediaQuery } from '@mui/material';

export const PageHeader = ({ title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Typography
      variant={isMobile ? "h6" : "h5"}
      sx={{
        mb: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 0 }
      }}
    >
      {title}
    </Typography>
  );
};