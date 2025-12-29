import React, { useEffect } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchFavoriteOffersAction } from '../../store/api-actions';

const Favorites: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const favoriteOffers = useSelector((state: RootState) => state.userState.favoriteOffers);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  const favoritesIsEmpty = favoriteOffers.length === 0;

  return (
    <div className="page">
      <Header />

      {favoritesIsEmpty ? (
        <EmptyFavorites />
      ) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>

              <FavoritesList offers={favoriteOffers} />
            </section>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default Favorites;
