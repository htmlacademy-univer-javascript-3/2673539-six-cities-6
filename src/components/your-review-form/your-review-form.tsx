import React, { useState } from 'react';

const YourReviewForm: React.FC = () => {
  const [rating, setRating] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const updateSubmitButtonState = (currentRating: string | null, currentReviewText: string) => {
    const isRatingSelected = currentRating !== null;
    const isTextLongEnough = currentReviewText.length >= 50;
    setIsSubmitDisabled(!(isRatingSelected && isTextLongEnough));
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.value);
    updateSubmitButtonState(event.target.value, reviewText);
  };

  const handleReviewTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newReviewText = event.target.value;
    setReviewText(newReviewText);
    updateSubmitButtonState(rating, newReviewText);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log('Rating:', rating);
    // console.log('Review Text:', reviewText);
    setRating(null);
    setReviewText('');
    setIsSubmitDisabled(true);
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          checked={rating === '5'}
          onChange={handleRatingChange}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          checked={rating === '4'}
          onChange={handleRatingChange}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">

            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          checked={rating === '3'}
          onChange={handleRatingChange}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          checked={rating === '2'}
          onChange={handleRatingChange}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          checked={rating === '1'}
          onChange={handleRatingChange}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        onChange={handleReviewTextChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
      </div>
    </form>
  );
};

export default YourReviewForm;
