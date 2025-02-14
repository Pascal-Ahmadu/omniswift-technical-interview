import React from 'react';
import { Box, Card, CardContent, Skeleton, Table, TableHead, TableBody, TableRow, Button } from '@mui/material';
import { StyledTableCell, StyledTableRow, StyledTableContainer } from '../StyledComponents';
import { TABLE_HEADERS } from './constants';
import StudentResult from '../StudentResult';

export const TableSkeleton = () => (
  <Card sx={{
    boxShadow: 3,
    p: 3,
    mb: 3,
    borderRadius: 0,
    height: 513,
    width: 1145,
    mx: 'auto'
  }}>
    <CardContent>
      <Box sx={{ width: '100%' }}>
        <StyledTableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {TABLE_HEADERS.map((header) => (
                  <StyledTableCell key={header}>
                    <Skeleton variant="text" animation="wave" width={80} />
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(new Array(5)).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from(new Array(8)).map((__, cellIndex) => (
                    <StyledTableCell key={cellIndex}>
                      <Skeleton variant="text" animation="wave" width={80} />
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

export const ErrorCard = ({ error }) => (
  <Card sx={{
    boxShadow: 3,
    p: 3,
    mb: 3,
    borderRadius: 0,
    height: 513,
    width: 1145,
    mx: 'auto'
  }}>
    <CardContent sx={{ color: 'error.main' }}>
      Error loading students: {error}
    </CardContent>
  </Card>
);

export const DownloadButton = ({ onClick }) => (
  <Button
    variant="contained"
    onClick={onClick}
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
);

export const PrintContainer = ({ printRef, printData }) => (
  <div
    id="print-container"
    ref={printRef}
    style={{
      visibility: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      backgroundColor: 'white',
      zIndex: -1000
    }}
  >
    {printData && <StudentResult student={printData} />}
  </div>
);