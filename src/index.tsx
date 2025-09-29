import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/main/main';
import Login from './pages/login/login';
import Favorites from './pages/favorites/favorites';
import Offer from './pages/offer/offer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Main />
    <Login />
    <Favorites />
    <Offer />
  </React.StrictMode>
);
