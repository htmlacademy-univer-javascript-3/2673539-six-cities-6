import React from 'react';
import { OfferCardType } from '../../types/offer';
import { SixCities } from '../../const';
import Card from '../card/card';

interface OffersListProps {
  offers: OfferCardType[];
  currentCity: SixCities;
  activeOfferId: string | null;
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
          .filter((offer) => offer.city.name === currentCity.toString())
          .map((offer) => (
            <Card
              onMouseEnter={() => handleCardMouseEnter(offer.id)}
              onMouseLeave={handleCardMouseLeave}
              key={offer.id}
              id={offer.id}
              isPremium={offer.isPremium}
              imageUrl={offer.previewImage}
              price={offer.price}
              rating={offer.rating}
              type={offer.type}
              title={offer.title}
              isFavorite={offer.isFavorite}
            />
          ))}
    </div>
  );
};

export default OffersList;

