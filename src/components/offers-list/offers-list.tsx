import React from 'react';
import { OfferCardType } from '../../types/offer';
import { CitiesEnum } from '../../const';
import Card from '../card/card';

interface OffersListProps {
  offers: OfferCardType[];
  currentCity: CitiesEnum;
  onActiveOfferChange: (offerId: string | null) => void;
}

const OffersList: React.FC<OffersListProps> = ({ offers, currentCity, onActiveOfferChange }) => {
  const handleCardMouseEnter = (offerId: string) => {
    onActiveOfferChange(offerId);
  };

  const handleCardMouseLeave = () => {
    onActiveOfferChange(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.length > 0 &&
        offers
          .filter((offer) => offer.city.name === currentCity)
          .map((offer) => (
            <Card
              key={offer.id}
              onMouseEnter={() => handleCardMouseEnter(offer.id)}
              onMouseLeave={handleCardMouseLeave}
              offer={offer}
            />
          ))}
    </div>
  );
};

export default OffersList;

