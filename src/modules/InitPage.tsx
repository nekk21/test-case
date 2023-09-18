import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/api/gitH.api';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import Card from '../components/Card';
import {
  Box,
  CircularProgress,
  Container,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';

const InitPage = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebouncedValue(search);

  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const handlerClick = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Container sx={{ width: '60%', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
      {isError && <p>Some Error..</p>}

      <Box sx={{ width: '100%' }}>
        <TextField
          fullWidth
          id='outlined-basic'
          label='Search'
          variant='outlined'
          value={search}
          onChange={handlerChange}
        />
        {dropdown && (
          <>
            {isLoading && <LinearProgress />}
            <List component='nav' aria-label='secondary mailbox folder'>
              {data?.map(user => (
                <ListItemButton key={user.id} onClick={() => handlerClick(user.login)}>
                  <ListItemText primary={user.login} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        <Box>
          {areReposLoading ? (
            <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            repos?.map(repo => <Card repo={repo} key={repo.id} />)
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default InitPage;
