import React from 'react';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import EmptyMain from '../../components/empty-main/empty-main';
import { OfferCardType } from '../../types/offer';
import { SixCities } from '../../const';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';

export interface MainProps {
  offers: OfferCardType[];
}

const currentCity = SixCities.Amsterdam;

const Main: React.FC<MainProps> = ({ offers }) => {
  offers = offers.filter((offer) => offer.city.name === currentCity.toString());
  const MainIsEmpty = offers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header userEmail='Oliver.conner@gmail.com' favoriteCount={3} isLoggedIn></Header>

      <main className="page__main page__main--index">
        <CitiesTabs CurrentCity={currentCity} />
        {MainIsEmpty ? <EmptyMain /> :
          (
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.length} places to stay in {currentCity}</b>
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
                  <OffersList offers={offers} currentCity={currentCity} />
                </section>
                <div className="cities__right-section">
                  <section style={{ width: '100%' }}>
                    <Map city={offers[3].city} offers={offers} currentOffer={offers[3]}></Map>
                  </section>
                </div>
              </div>
            </div>
          )};
      </main>
    </div>
  );
};

export default Main;
