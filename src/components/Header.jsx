import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Header() {
  return (
    <Typography
      component="div"
      sx={ { bgcolor: 'warning.main' } }
    >
      <Box
        sx={ {
          textAlign: 'center',
          fontSize: { xs: 'large', md: 'xx-large' },
          m: 'auto',
          mb: '2rem',
          fontWeight: 'bold',
          fontStyle: 'oblique',
          letterSpacing: 4,
        } }
        xs={ 8 }
        md={ 12 }
      >
        Trybe Wallet
      </Box>
    </Typography>
  );
}
