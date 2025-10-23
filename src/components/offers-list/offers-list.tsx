import React, { useState } from 'react';
import { OfferType } from '../../types/offer';
import { SixCities } from '../../const';
import Card from '../card/card';

interface OffersListProps {
  offers: OfferType[],
  currentCity: SixCities
}

const OffersList: React.FC<OffersListProps> = ({ offers, currentCity }) => {
  const [_, setActiveOfferId] = useState<string | null>(null);

  const handleCardMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  const handleCardMouseLeave = () => {
    setActiveOfferId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.length > 0 && offers.filter((offer) => offer.city.name === currentCity).map((offer) => (
        <Card
          onMouseEnter={() => handleCardMouseEnter(offer.id)}
          onMouseLeave={handleCardMouseLeave}

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
  )
}

export default OffersList
