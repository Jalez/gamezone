/** @format */


import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component='h1' variant='h4' gutterBottom>
          404
        </Typography>
        <Typography variant='h6' gutterBottom>
          Oops! Page Not Found :(
        </Typography>
        <Typography variant='body1' color='textSecondary' align='center'>
          We're sorry, but the page you are looking for doesn't exist.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          sx={{ mt: 3 }}
          component={Link}
          to='/'>
          Back to Home Page
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
