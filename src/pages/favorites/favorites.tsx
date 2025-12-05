import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import FavoritesList from '../../components/favorites-list/favorites-list';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const favoritesIsEmpty = false;



const Favorites: React.FC = () => {
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) =>
    state.offers.filter((offer) => offer.city.name === city.name)
  );
  return (
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
}

export default Favorites;
