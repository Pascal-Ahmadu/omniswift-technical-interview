import { styled } from '@mui/material/styles';
import { TableCell, TableRow, Paper } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 14,
    padding: '16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '16px',
    color: theme.palette.common.black,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  // Ensuring every row is white
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.common.white,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

export const StyledTableContainer = styled(Paper)({
  height: '432px',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '24px',
    backgroundColor: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#4CAF50',
    border: '8px solid #f1f1f1',
    borderRadius: '12px',
    minHeight: '40px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#45a049',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
  },
});
