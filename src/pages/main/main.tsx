import React from 'react';
import Card from '../../components/card';
import Header from '../../components/header';
import CitiesTabs from '../../components/cities-tabs';
import EmptyMain from '../../components/empty-main';


const Main: React.FC = () => {
  const MainIsEmpty = false;

  return (
    <div className="page page--gray page--main">
      <Header userEmail='Oliver.conner@gmail.com' favoriteCount={3} isLoggedIn></Header>

      <main className="page__main page__main--index">
        <CitiesTabs />
        {MainIsEmpty ? <EmptyMain /> :
          (
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">312 places to stay in Amsterdam</b>
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <span className="places__sorting-type" tabIndex={0}>
                      Popular
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select"></use>
                      </svg>
                    </span>
                    <ul className="places__options places__options--custom places__options--opened">
                      <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                      <li className="places__option" tabIndex={0}>Price: low to high</li>
                      <li className="places__option" tabIndex={0}>Price: high to low</li>
                      <li className="places__option" tabIndex={0}>Top rated first</li>
                    </ul>
                  </form>
                  <div className="cities__places-list places__list tabs__content">
                    <Card isPremium imageUrl='img/apartment-01.jpg' price={120} rating={80} type='Apartment' title='Beautiful &amp; luxurious apartment at great location' />
                    <Card isFavorite imageUrl='img/room.jpg' price={80} rating={80} type='Room' title='Wood and stone place' />
                    <Card imageUrl='img/apartment-02.jpg' price={132} rating={80} type='Apartment' title='Canal View Prinsengracht' />
                    <Card isPremium imageUrl='img/apartment-03.jpg' price={180} rating={100} type='Apartment' title='Nice, cozy, warm big bed apartment' />
                    <Card isFavorite imageUrl='img/room.jpg' price={80} rating={80} type='Room' title='Wood and stone place' />
                  </div>
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map"></section>
                </div>
              </div>
            </div>
          )}
      </main>
    </div>
  );
};

export default Main;
