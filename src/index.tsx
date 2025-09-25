import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import Offer from './pages/Offer';
import Property from './pages/Property';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Main />
    <Login />
    <Favorites />
    <Offer />
    <Property />
  </React.StrictMode>
);
