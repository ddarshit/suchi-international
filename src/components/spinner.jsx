import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ProgressLoading() {
  return (
    <Box sx={{ display: 'flex',alignItems:"center", justifyContent:"center",overflow:"hidden",height:"90vh", }}>
      <CircularProgress />
    </Box>
  );
}