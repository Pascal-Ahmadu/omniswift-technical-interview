import React from 'react';
import { Card, CardContent, Typography, Alert } from '@mui/material';

export const ErrorCard = ({ error }) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        p: 3,
        mb: 3,
        borderRadius: 0,
        height: 513,
        width: 1145,
        mx: 'auto'
      }}
    >
      <CardContent>
        <Alert severity="error" sx={{ borderRadius: 0 }}>
          <Typography variant="body1">
            Error loading students: {error}
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};