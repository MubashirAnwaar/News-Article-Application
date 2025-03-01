import { Grid } from '@mui/material'; // Go back to using the original Grid
import React from 'react';
import Sidebar from './sidebar';

export const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}><Sidebar /></Grid> 
      <Grid item xs={9}>content</Grid> 
    </Grid>
  );
};