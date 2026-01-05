import { render } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { ReviewType } from '../../types/review';

const createMockReview = (id: string, overrides?: Partial<ReviewType>): ReviewType => ({
  id,
  date: '2024-01-15T10:30:00.000Z',
  user: {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    isPro: true,
  },
  comment: 'This is a great place!',
  rating: 4.5,
  ...overrides,
});

const renderReviewsList = (reviews: ReviewType[]) => (
  render(<ReviewsList reviews={reviews} />)
);

describe('ReviewsList Component', () => {
  test('renders reviews section with correct classes', () => {
    const { container } = renderReviewsList([]);

    const reviewsSection = container.querySelector('.reviews');
    expect(reviewsSection).toBeInTheDocument();
  });

  test('renders title with correct text and review count', () => {
    const reviews = [
      createMockReview('1'),
      createMockReview('2'),
      createMockReview('3'),
    ];
    const { getByText } = renderReviewsList(reviews);

    const titleElement = getByText(/Reviews/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('reviews__title');

    const countElement = getByText('3');
    expect(countElement).toBeInTheDocument();
    expect(countElement).toHaveClass('reviews__amount');
  });

  test('renders reviews list with correct class', () => {
    const { container } = renderReviewsList([]);

    const reviewsList = container.querySelector('.reviews__list');
    expect(reviewsList).toBeInTheDocument();
  });

  test('renders correct number of Review components', () => {
    const reviews = [
      createMockReview('1'),
      createMockReview('2'),
      createMockReview('3'),
    ];

    const { container } = renderReviewsList(reviews);

    const reviewItems = container.querySelectorAll('.reviews__item');
    expect(reviewItems).toHaveLength(3);
  });

  test('renders no reviews when reviews array is empty', () => {
    const { container } = renderReviewsList([]);

    const reviewItems = container.querySelectorAll('.reviews__item');
    expect(reviewItems).toHaveLength(0);
  });

  test('shows zero count when no reviews', () => {
    const { getByText } = renderReviewsList([]);

    const countElement = getByText('0');
    expect(countElement).toBeInTheDocument();
  });

  test('shows correct review count in title', () => {
    const reviews = [
      createMockReview('1'),
      createMockReview('2'),
    ];

    const { getByText } = renderReviewsList(reviews);

    const countElement = getByText('2');
    expect(countElement).toBeInTheDocument();
  });


  test('uses review id as key for each Review component', () => {
    const reviews = [
      createMockReview('review-1'),
      createMockReview('review-2'),
    ];

    const { container } = renderReviewsList(reviews);

    const reviewItems = container.querySelectorAll('.reviews__item');
    expect(reviewItems).toHaveLength(2);
  });

  test('renders all required CSS classes', () => {
    const { container } = renderReviewsList([]);

    const expectedClasses = [
      'reviews',
      'reviews__title',
      'reviews__amount',
      'reviews__list',
    ];

    expectedClasses.forEach((className) => {
      const elements = container.getElementsByClassName(className);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test('matches snapshot with reviews', () => {
    const reviews = [
      createMockReview('1'),
      createMockReview('2'),
    ];

    const { container } = renderReviewsList(reviews);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with empty reviews', () => {
    const { container } = renderReviewsList([]);
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with single review', () => {
    const reviews = [createMockReview('1')];
    const { container } = renderReviewsList(reviews);
    expect(container).toMatchSnapshot();
  });

  test('title contains middot separator', () => {
    const reviews = [createMockReview('1')];
    const { container } = renderReviewsList(reviews);

    const titleElement = container.querySelector('.reviews__title');
    expect(titleElement?.textContent).toContain('·');
  });
});
