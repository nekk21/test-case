import { Box, Container } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <Container
      sx={{
        borderRadius: '12px',
        width: '100%',
        padding: '5px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '100% !important',
        height: '50px',
        backgroundColor: 'grey',
      }}
    >
      <h1>GitHub Finder</h1>
      <Box>
        <Link style={{ color: 'white', marginRight: '10px' }} to='/'>
          Home
        </Link>
        <Link style={{ color: 'white' }} to='/favourites'>
          Favourites
        </Link>
      </Box>
    </Container>
  );
};

export default TopBar;
