import React, { useState, useMemo } from 'react';
import Header from '../../components/header/header';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import EmptyMain from '../../components/empty-main/empty-main';

import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { PlacesOptions } from '../../types/places-options';


import { useSelector } from 'react-redux';
import { RootState } from '../../store';




const Main: React.FC = () => {
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) =>
    state.offers.filter((offer) => offer.city.name === city.name)
  );

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<PlacesOptions>(PlacesOptions.Popular);
  const [isSortingOpen, setIsSortingOpen] = useState<boolean>(false);



  const sortedOffers = useMemo(() => {
    const offersCopy = [...offers];
    switch (selectedOption) {
      case PlacesOptions.LowToHigh:
        return offersCopy.sort((a, b) => a.price - b.price);
      case PlacesOptions.HighToLow:
        return offersCopy.sort((a, b) => b.price - a.price);
      case PlacesOptions.TopRated:
        return offersCopy.sort((a, b) => b.rating - a.rating);
      default:
        return offersCopy;
    }
  }, [offers, selectedOption]);

  const mainIsEmpty = sortedOffers.length === 0;

  const handleOptionClick = (option: PlacesOptions) => {
    setSelectedOption(option);
    setIsSortingOpen(false);
  };

  return (
    <div className="page page--gray page--main">
      <Header userEmail="Oliver.conner@gmail.com" favoriteCount={3} isLoggedIn />

      <main className="page__main page__main--index">
        <CitiesTabs  />

        {mainIsEmpty ? (
          <EmptyMain />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {sortedOffers.length} places to stay in {city.name}
                </b>

                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption" style={{ marginRight: '10px' }}>
                    Sort by
                  </span>
                  <span
                    className="places__sorting-type"
                    tabIndex={0}
                    onClick={() => setIsSortingOpen((prev) => !prev)}
                  >
                    {selectedOption}
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>

                  <ul
                    className={`places__options places__options--custom ${isSortingOpen ? 'places__options--opened' : ''}`}
                  >
                    {Object.values(PlacesOptions).map((option) => (
                      <li
                        key={option}
                        className={`places__option ${option === selectedOption ? 'places__option--active' : ''}`}
                        tabIndex={0}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </form>

                <OffersList
                  offers={sortedOffers}
                  currentCity={city.name}
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

export default Main;
