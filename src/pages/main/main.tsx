import React, { useState } from 'react';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import EmptyMain from '../../components/empty-main/empty-main';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import SortingOptions from '../../components/sorting-options/sorting-options';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SixCities } from '../../const';

const Main: React.FC = () => {
  const currentCity =
    useSelector((state: RootState) => state.cityState.city) ?? SixCities[0];

  const offers = useSelector((state: RootState) =>
    state.offersState.offers.filter((offer) => offer.city.name === currentCity.name)
  );

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const mainIsEmpty = offers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header />

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
                  {offers.length} places to stay in {currentCity.name}
                </b>

                <SortingOptions offers={offers} />

                <OffersList
                  offers={offers}
                  currentCity={currentCity.name}
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
