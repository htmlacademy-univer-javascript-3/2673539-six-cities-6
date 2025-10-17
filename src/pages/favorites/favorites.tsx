import React from 'react';
import Header from '../../components/header/header';
import FavoriteCard from '../../components/favorite-card/favorite-card';
import Footer from '../../components/footer/footer';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites';

const favoritesIsEmpty = false;

const Favorites: React.FC = () => (
  <div className="page">
    <Header userEmail='Oliver.conner@gmail.com' favoriteCount={3} isLoggedIn ></Header>
    {favoritesIsEmpty ? (
      <EmptyFavorites />
    ) : (
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoriteCard isPremium imageUrl='img/apartment-03.jpg' price={180} rating={100} type='Apartment' title='Nice, cozy, warm big bed apartment' />
                  <FavoriteCard imageUrl='img/room.jpg' price={80} rating={80} type='Room' title='Wood and stone place' />
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoriteCard imageUrl='img/apartment-small-04.jpg' price={180} rating={100} type='Apartment' title='White castle' />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    )}
    <Footer />
  </div>
);

export default Favorites;
