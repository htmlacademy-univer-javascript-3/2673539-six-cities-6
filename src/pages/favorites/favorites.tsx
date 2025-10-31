import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { OfferType } from '../../types/offer';

const favoritesIsEmpty = false;

interface FavoritesProps {
  offers: OfferType[];
}

const Favorites: React.FC<FavoritesProps> = ({ offers }) => (
  <div className="page">
    <Header userEmail='Oliver.conner@gmail.com' favoriteCount={3} isLoggedIn ></Header>
    {favoritesIsEmpty ? (
      <EmptyFavorites />
    ) : (
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={offers} />
          </section>
        </div>
      </main>
    )};
    <Footer />
  </div>
);

export default Favorites;
