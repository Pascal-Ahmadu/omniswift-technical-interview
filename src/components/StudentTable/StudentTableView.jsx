
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Box,
  Card,
  CardContent,
  Button
} from '@mui/material';
import PropTypes from 'prop-types';
import { StyledTableCell, StyledTableRow, StyledTableContainer } from './StyledComponents';
const StudentRow = ({ student, onDownload }) => (
  <StyledTableRow>
    <StyledTableCell>{student.id}</StyledTableCell>
    <StyledTableCell>{student.surname}</StyledTableCell>
    <StyledTableCell>{student.firstname}</StyledTableCell>
    <StyledTableCell>{student.age}</StyledTableCell>
    <StyledTableCell>{student.gender}</StyledTableCell>
    <StyledTableCell>{student.level}</StyledTableCell>
    <StyledTableCell>{student.state}</StyledTableCell>
    <StyledTableCell sx={{ width: '100px' }}>
      <Button
        variant="contained"
        onClick={() => onDownload(student.id)}
        sx={{
          bgcolor: '#4CAF50',
          '&:hover': { bgcolor: '#45a049' },
          borderRadius: 0,
          textTransform: 'none',
          padding: '6px 10px',
          boxShadow: 'none',
          width: '126px',
          height: '35px',
          fontSize: '12px'
        }}
      >
        Download Result
      </Button>
    </StyledTableCell>
  </StyledTableRow>
);

StudentRow.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired,
  onDownload: PropTypes.func.isRequired,
};

const EmptyState = () => (
  <StyledTableRow>
    <StyledTableCell colSpan={8} align="center">
      No students data available
    </StyledTableCell>
  </StyledTableRow>
);

StudentTableView.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  })).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDownload: PropTypes.func.isRequired,
};

export const StudentTableView = ({ students, headers, onDownload }) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        p: { xs: 1, sm: 2, md: 3 },
        mb: 3,
        borderRadius: 0,
        height: { xs: 'auto', md: 513 },
        width: { xs: '100%', md: 1145 },
        maxWidth: '100%',
        mx: 'auto',
        overflow: 'hidden'
      }}
    >
      <CardContent>
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <StyledTableContainer>
            <Table
              stickyHeader
              sx={{
                width: { xs: 'auto', md: 1036 },
                minWidth: 800
              }}
            >
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <StyledTableCell key={header}>{header}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students?.length > 0 ? (
                  students.map((student) => (
                    <StudentRow
                      key={student.id}
                      student={student}
                      onDownload={onDownload}
                    />
                  ))
                ) : (
                  <EmptyState />
                )}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
      </CardContent>
    </Card>
  );
};