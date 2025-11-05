import React from 'react';
import { reviews } from '../../mocks/reviews';
import Review from '../review/review';

const ReviewsList: React.FC = () => (
  <section className='reviews'>
    <h2 className='reviews__title'>
      Reviews &middot; <span className='reviews__amount'>{reviews.length}</span>
    </h2>

    <ul className='reviews__list'>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  </section>
);

export default ReviewsList;
