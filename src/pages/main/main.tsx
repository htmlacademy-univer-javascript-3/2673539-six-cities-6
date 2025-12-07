import React, { useState } from 'react';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import EmptyMain from '../../components/empty-main/empty-main';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import SortingOptions from '../../components/sorting-options/sorting-options';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


const Main: React.FC = () => {
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) =>
    state.offers.filter((offer) => offer.city.name === city.name)
  );

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const mainIsEmpty = offers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header userEmail="Oliver.conner@gmail.com" favoriteCount={3} isLoggedIn />

      <main className="page__main page__main--index">
        <CitiesTabs />

        {mainIsEmpty ? (
          <EmptyMain />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers.length} places to stay in {city.name}
                </b>

                <SortingOptions offers={offers}></SortingOptions>

                <OffersList
                  offers={offers}
                  currentCity={city.name}
                  onActiveOfferChange={setActiveOfferId}
                />
              </section>

              <div className="cities__right-section">
                <section style={{ width: '100%' }}>
                  <Map
                    city={offers[0].city}
                    offers={offers}
                    currentOffer={
                      offers.find((offer) => offer.id === activeOfferId) ?? undefined
                    }
                  />
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Main;
