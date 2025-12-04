import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from './const';
import Main from './pages/main/main';
import Login from './pages/login/login';
import Favorites from './pages/favorites/favorites';
import Offer from './pages/offer/offer';
import NotFoundPage from './pages/not-found-page/not-found-page';
import PrivateRoute from './components/private-route/private-route';
import { AuthorizationStatus } from './const';
import { OfferCardType } from './types/offer';

import { useDispatch, useSelector } from 'react-redux';
import { changeCity, loadOffers } from './store/actions/action';
import { RootState } from './store';

interface AppProps {
  testOffers: OfferCardType[];
}

const App: React.FC<AppProps> = ({ testOffers }) => {
  const dispatch = useDispatch();
  dispatch(loadOffers(testOffers));

  // const currentCity = useSelector((state: RootState) => state.city);
  // const offers = useSelector((state: RootState) => state.offers);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Main />}
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <Favorites offers={testOffers} />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<Offer />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
