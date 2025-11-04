import React from 'react';
import { OfferCardType } from '../../types/offer';
import { SixCities } from '../../const';
import Card from '../card/card';

interface FavoritesListProps {
  offers: OfferCardType[];
}

const FavoritesList: React.FC<FavoritesListProps> = ({ offers }) => {
  const groupedOffers = offers.filter((offer) => offer.isFavorite).reduce((acc: { [key in SixCities]?: OfferCardType[] }, offer) => {
    const city = offer.city.name as SixCities;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city]?.push(offer);
    return acc;
  }, {});


  return (
    <ul className="favorites__list">
      {Object.entries(groupedOffers).map(([city, cityOffers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <Card
                key={offer.id}
                id={offer.id}
                isPremium={offer.isPremium}
                imageUrl={offer.previewImage}
                price={offer.price}
                rating={offer.rating}
                type={offer.type}
                title={offer.title}
                isFromFavoritePage
              />
            ))};
          </div>
        </li>
      ))};
    </ul>
  );
};

export default FavoritesList;
