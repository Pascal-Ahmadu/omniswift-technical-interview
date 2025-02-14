import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Box,
  Card,
  CardContent,
  Skeleton
} from '@mui/material';
import { StyledTableCell, StyledTableRow, StyledTableContainer } from './StyledComponents';
import { TABLE_HEADERS } from './constants'; // Ensure you import your table headers

export const TableSkeleton = () => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        p: { xs: 1, sm: 2, md: 3 },
        mb: 3,
        borderRadius: 0,
        // Responsive height and width:
        height: { xs: 'auto', md: 513 },
        width: { xs: '100%', md: 1145 },
        mx: 'auto'
      }}
    >
      <CardContent>
        <Box sx={{ width: '100%', overflow: 'auto' }}>
          <StyledTableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {TABLE_HEADERS.map((header) => (
                    <StyledTableCell key={header}>
                      {/* Adjust Skeleton width responsively */}
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ width: { xs: 50, md: 80 } }}
                      />
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(5)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {[...Array(8)].map((__, cellIndex) => (
                      <StyledTableCell key={cellIndex}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          sx={{ width: { xs: 50, md: 80 } }}
                        />
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </Box>
      </CardContent>
    </Card>
  );
};
