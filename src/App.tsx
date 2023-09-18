import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InitPage from './modules/InitPage';
import FavouritePage from './modules/FavouritePage';
import TopBar from './components/TopBar';

const App = () => {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path='/' element={<InitPage />} />
        <Route path='/favourites' element={<FavouritePage />} />
      </Routes>
    </>
  );
};

export default App;
