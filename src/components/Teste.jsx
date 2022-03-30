import React from 'react';
import { TextField, Grid } from '@mui/material';

export default class Teste extends React.Component {
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField fullwidth />
        </Grid>
      </Grid>
    );
  }
}
