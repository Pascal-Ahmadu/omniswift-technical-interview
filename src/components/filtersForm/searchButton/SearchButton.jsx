import { Button } from "@mui/material";

export const SearchButton = ({ onClick, disabled }) => (
    <Button
      variant="contained"
      fullWidth
      onClick={onClick}
      disabled={disabled}
      sx={{
        bgcolor: '#46C35F',
        '&:hover': { bgcolor: '#46C35F' },
        borderRadius: '4px',
        height: '50px',
        textTransform: 'none',
        fontFamily: 'Lato',
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '0.1px',
        color: '#FFFFFF'
      }}
    >
      Search
    </Button>
  );