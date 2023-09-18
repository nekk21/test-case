import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { Favourites } from '../store/types';
import { Box, Button, Container, Link, Rating, Typography } from '@mui/material';
import { useActions } from '../hooks/useActions';

const FavouritePage = () => {
  const { favourites } = useAppSelector(state => state.github);
  const { setRate, removeFavourite } = useActions();

  const handleRate = ({ rate, url }: Favourites) => {
    setRate({ rate, url });
  };

  if (favourites.length === 0) {
    return <Typography className='text-center'>No items</Typography>;
  }

  return (
    <Container sx={{}}>
      {favourites.map((f: Favourites) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '5px',
            padding: '15px',
            backgroundColor: 'whitesmoke',
            borderRadius: '16px',
          }}
          key={f.url}
        >
          <Link underline='none' href={f.url} target='_blank' rel='noreferrer'>
            {f.url}
          </Link>

          <Box>
            <Button
              sx={{ marginRight: '20px' }}
              color='error'
              variant='contained'
              onClick={() => removeFavourite(f.url)}
            >
              Remove
            </Button>

            <Rating
              name='simple-controlled'
              value={f.rate}
              onChange={(event, newValue) => {
                handleRate({ rate: newValue, url: f.url });
              }}
            />
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default FavouritePage;
