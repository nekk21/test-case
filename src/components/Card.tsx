import React, { MouseEvent, useState } from 'react';

import { Repo } from '../store/types';
import { useAppSelector } from '../hooks/useAppSelector';
import { useActions } from '../hooks/useActions';
import { Box, Button, Link, Typography } from '@mui/material';

const Card = ({ repo }: { repo: Repo }) => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector(state => state.github);

  const [isFavourite, setIsFavourite] = useState(favourites.some(obj => obj.url === repo.html_url));

  const addToFavourite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite({ url: repo.html_url, rate: null });
    setIsFavourite(true);
  };

  const removeFromFavourite = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setIsFavourite(false);
  };

  return (
    <Box sx={{ marginTop: '5px', padding: '15px', backgroundColor: 'whitesmoke', borderRadius: '8px' }}>
      <Link underline='none' href={repo.html_url} target='_blank' rel='noreferrer'>
        <Typography>{repo.full_name}</Typography>
        <Typography>
          Forks: <span>{repo.forks}</span>
          Watchers: <span>{repo.watchers}</span>
        </Typography>
        <p>{repo?.description}</p>

        {!isFavourite && (
          <Button color='success' variant='contained' onClick={addToFavourite}>
            Add
          </Button>
        )}

        {isFavourite && (
          <Button color='error' variant='contained' onClick={removeFromFavourite}>
            Remove
          </Button>
        )}
      </Link>
    </Box>
  );
};

export default Card;
