import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Header() {
  return (
    <Typography
      component="div"
      sx={{ bgcolor: 'warning.main' }}  
    >
      <Box sx={{ 
        textAlign: 'center',
        fontSize: {xs:'30px', md:'50px'},
        m: 'auto',
        fontWeight: 'bold',
        fontStyle: 'oblique',
        letterSpacing: 3
      }}
      >
        Trybe Wallet
      </Box>
    </Typography>
  );
}