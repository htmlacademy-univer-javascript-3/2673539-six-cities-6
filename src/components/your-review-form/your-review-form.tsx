import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { postCommentAction } from '../../store/api-actions';
import { toast } from 'react-toastify';

interface YourReviewFormProps {
  offerId: string;
}

const YourReviewForm: React.FC<YourReviewFormProps> = ({ offerId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [rating, setRating] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSending, setIsSending] = useState(false);

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

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!rating || reviewText.length < 50) {
        return;
      }

      try {
        setIsSending(true);
        setIsSubmitDisabled(true);

        await dispatch(
          postCommentAction({
            offerId,
            comment: reviewText,
            rating: Number(rating),
          })
        );

        setRating(null);
        setReviewText('');
        setIsSubmitDisabled(true);
      } catch (error) {
        toast.error('Не удалось отправить комментарий\nПопробуйте позже');
      } finally {
        setIsSending(false);
      }
    },
    [rating, reviewText, dispatch, offerId]
  );


  return (
    <form className="reviews__form form" onSubmit={() => handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <fieldset disabled={isSending} className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === String(star)}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title="rating"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </fieldset>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        onChange={handleReviewTextChange}
        disabled={isSending}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isSending}
        >
          {isSending ? 'Sending…' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default YourReviewForm;
