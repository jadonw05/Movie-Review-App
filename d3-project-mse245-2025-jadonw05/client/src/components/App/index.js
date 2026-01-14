import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Landing from '../Landing';
import Review from '../Review';
import Search from '../Search';
import MyPage from '../MyPage';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#141414' }}>
      <Toolbar sx={{ display: 'flex', gap: 2 }}>
        <Button
          id="nav-landing"
          onClick={() => navigate('/')}
          sx={{ color: '#e50914', fontWeight: 'bold', textTransform: 'none' }}
        >
          Home
        </Button>
        <Button
          id="nav-search"
          onClick={() => navigate('/Search')}
          sx={{ color: 'white', textTransform: 'none' }}
        >
          Search
        </Button>
        <Button
          id="nav-review"
          onClick={() => navigate('/Review')}
          sx={{ color: 'white', textTransform: 'none' }}
        >
          Review
        </Button>
        <Button
          id="nav-myPage"
          onClick={() => navigate('/MyPage')}
          sx={{ color: 'white', textTransform: 'none' }}
        >
          My Page
        </Button>
      </Toolbar>
    </AppBar>
  );
};


const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/MyPage" element={<MyPage userID={1} />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
