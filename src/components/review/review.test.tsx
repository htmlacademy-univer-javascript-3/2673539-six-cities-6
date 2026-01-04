import { render } from '@testing-library/react';
import Review from './review';
import { ReviewType } from '../../types/review';

const createMockReview = (overrides?: Partial<ReviewType>): ReviewType => ({
  id: '1',
  date: '2024-01-15T10:30:00.000Z',
  user: {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    isPro: true,
  },
  comment: 'This is a great place! Highly recommend.',
  rating: 4.5,
  ...overrides,
});

const renderReview = (review: ReviewType) => (
  render(<Review review={review} />)
);

describe('Review Component', () => {
  test('renders review item with correct classes', () => {
    const review = createMockReview();
    const { container } = renderReview(review);

    const reviewItem = container.querySelector('.reviews__item');
    expect(reviewItem).toBeInTheDocument();
  });

  test('renders user information correctly', () => {
    const review = createMockReview({
      user: {
        name: 'Jane Smith',
        avatarUrl: 'https://example.com/jane-avatar.jpg',
        isPro: false,
      },
    });
    const { container, getByText } = renderReview(review);

    const userName = getByText('Jane Smith');
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveClass('reviews__user-name');

    const userAvatar = container.querySelector('.reviews__avatar');
    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute('src', 'https://example.com/jane-avatar.jpg');
    expect(userAvatar).toHaveAttribute('alt', 'Jane Smith');
    expect(userAvatar).toHaveAttribute('width', '54');
    expect(userAvatar).toHaveAttribute('height', '54');
  });

  test('renders rating stars with correct width', () => {
    const review = createMockReview({ rating: 4 });
    const { container } = renderReview(review);

    const ratingSpan = container.querySelector('.reviews__stars span');
    expect(ratingSpan).toBeInTheDocument();
    expect(ratingSpan).toHaveStyle('width: 80%'); // 4/5 * 100% = 80%
  });

  test('renders rating stars with 100% width for perfect rating', () => {
    const review = createMockReview({ rating: 5 });
    const { container } = renderReview(review);

    const ratingSpan = container.querySelector('.reviews__stars span');
    expect(ratingSpan).toHaveStyle('width: 100%');
  });

  test('renders rating stars with 0% width for zero rating', () => {
    const review = createMockReview({ rating: 0 });
    const { container } = renderReview(review);

    const ratingSpan = container.querySelector('.reviews__stars span');
    expect(ratingSpan).toHaveStyle('width: 0%');
  });

  test('renders review comment', () => {
    const review = createMockReview({ comment: 'Excellent service and location!' });
    const { getByText } = renderReview(review);

    const comment = getByText('Excellent service and location!');
    expect(comment).toBeInTheDocument();
    expect(comment).toHaveClass('reviews__text');
  });

  test('renders formatted date', () => {
    const review = createMockReview({ date: '2024-03-20T14:45:00.000Z' });
    const { container, getByText } = renderReview(review);

    const timeElement = container.querySelector('.reviews__time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('datetime', '2024-03-20T14:45:00.000Z');

    const formattedDate = getByText('March 2024');
    expect(formattedDate).toBeInTheDocument();
  });

  test('renders visually hidden rating text', () => {
    const review = createMockReview();
    const { getByText } = renderReview(review);

    const hiddenRating = getByText('Rating');
    expect(hiddenRating).toBeInTheDocument();
    expect(hiddenRating).toHaveClass('visually-hidden');
  });

  test('renders all required CSS classes', () => {
    const review = createMockReview();
    const { container } = renderReview(review);

    const expectedClasses = [
      'reviews__item',
      'reviews__user',
      'user',
      'reviews__avatar-wrapper',
      'user__avatar-wrapper',
      'reviews__avatar',
      'user__avatar',
      'reviews__user-name',
      'reviews__info',
      'reviews__rating',
      'rating',
      'reviews__stars',
      'rating__stars',
      'reviews__text',
      'reviews__time',
    ];

    expectedClasses.forEach((className) => {
      const elements = container.getElementsByClassName(className);
      expect(elements.length).toBeGreaterThan(0);
    });
  });


  test('matches snapshot with high rating', () => {
    const review = createMockReview({ rating: 4.8 });
    const { container } = renderReview(review);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with low rating', () => {
    const review = createMockReview({ rating: 2.3 });
    const { container } = renderReview(review);
    expect(container).toMatchSnapshot();
  });
});
