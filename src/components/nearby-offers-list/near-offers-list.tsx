import React from 'react';
import Card from '../card/card';
import { OfferCardType } from '../../types/offer';

interface NearOffersListProps {
  offers: OfferCardType[];
}

const NearOffersList: React.FC<NearOffersListProps> = ({ offers }) => (
  <section className='near-places places'>
    <h2 className='near-places__title'>Other places in the neighbourhood</h2>
    <div className='near-places__list places__list'>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          id={offer.id}
          imageUrl={offer.previewImage}
          price={offer.price}
          rating={offer.rating}
          type={offer.type}
          title={offer.title}
          isFavorite={offer.isFavorite}
          isPremium={offer.isPremium}
        />
      ))}
    </div>
  </section>
);

export default NearOffersList;
