import React, { useState, useMemo } from 'react';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import EmptyMain from '../../components/empty-main/empty-main';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import SortingOptions from '../../components/sorting-options/sorting-options';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SixCities } from '../../const';
import { PlacesOptions } from '../../types/places-options';

const Main: React.FC = () => {
  const currentCity =
    useSelector((state: RootState) => state.cityState.city) ?? SixCities[0];

  const allOffers = useSelector((state: RootState) => state.offersState.offers);

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<PlacesOptions>(PlacesOptions.Popular);

  const filteredOffers = useMemo(() => {
    return allOffers.filter((offer) => offer.city.name === currentCity.name);
  }, [allOffers, currentCity.name]);

  const sortedOffers = useMemo(() => {
    const copy = [...filteredOffers];

    switch (sortOption) {
      case PlacesOptions.LowToHigh:
        return copy.sort((a, b) => a.price - b.price);

      case PlacesOptions.HighToLow:
        return copy.sort((a, b) => b.price - a.price);

      case PlacesOptions.TopRated:
        return copy.sort((a, b) => b.rating - a.rating);

      default:
        return copy;
    }
  }, [filteredOffers, sortOption]);

  const mainIsEmpty = sortedOffers.length === 0;

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
                <b className="places__found">
                  {sortedOffers.length} places to stay in {currentCity.name}
                </b>

                <SortingOptions
                  selected={sortOption}
                  onChange={setSortOption}
                />

                <OffersList
                  offers={sortedOffers}
                  currentCity={currentCity.name}
                  onActiveOfferChange={setActiveOfferId}
                />
              </section>

              <div className="cities__right-section">
                <section style={{ width: '100%' }}>
                  <Map
                    city={sortedOffers[0].city}
                    offers={sortedOffers}
                    currentOffer={
                      sortedOffers.find((offer) => offer.id === activeOfferId) ?? undefined
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

export default React.memo(Main);
