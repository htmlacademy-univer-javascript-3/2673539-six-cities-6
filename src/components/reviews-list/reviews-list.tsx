import React from 'react';
import Review from '../review/review';
import { ReviewType } from '../../types/review';

interface ReviewsListProps{
  reviews: ReviewType[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({reviews}) => (
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
