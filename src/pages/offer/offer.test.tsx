import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Offer from './offer';
import { RootState } from '../../store';
import { createRandomOffer } from '../../utils/create-random-offer';
import { createRandomDetailedOffer } from '../../utils/create-random-detailed-offer';
import { AuthorizationStatus } from '../../const';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderOffer = (
  hasOffer = true,
  authStatus = AuthorizationStatus.NoAuth,
  offerId = 'test-offer-123'
) => {
  const mockOffer = hasOffer ? createRandomDetailedOffer() : null;
  const mockNearbyOffers = hasOffer ? [createRandomOffer(), createRandomOffer()] : [];
  const mockComments = hasOffer ? [
    {
      id: '1',
      date: '2024-01-15T10:30:00.000Z',
      user: {
        name: 'John Doe',
        avatarUrl: 'https://example.com/avatar.jpg',
        isPro: true,
      },
      comment: 'Great place!',
      rating: 4.5,
    }
  ] : [];

  const store = mockStore({
    detailedOfferState: {
      offer: mockOffer,
      nearbyOffers: mockNearbyOffers,
    },
    commentsState: {
      comments: mockComments,
    },
    userState: {
      authorizationStatus: authStatus,
    },
  } as unknown as RootState);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/offer/${offerId}`]}>
        <Routes>
          <Route path="/offer/:offerId" element={<Offer />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Offer Component', () => {
  test('renders page with correct structure', () => {
    const { container } = renderOffer(true);

    const pageContainer = container.querySelector('.page');
    expect(pageContainer).toBeInTheDocument();

    const mainElement = container.querySelector('.page__main--offer');
    expect(mainElement).toBeInTheDocument();
  });

  test('renders Header component', () => {
    const { container } = renderOffer(true);

    const headerElement = container.querySelector('header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('header');
  });

  test('renders "Offer not found" message when offer is null', () => {
    const { container } = renderOffer(false);

    const notFoundMessage = container.querySelector('h2');
    expect(notFoundMessage).toBeInTheDocument();
    expect(notFoundMessage?.textContent).toBe('Offer not found');
  });

  test('renders offer gallery when offer exists', () => {
    const { container } = renderOffer(true);

    const galleryContainer = container.querySelector('.offer__gallery-container');
    expect(galleryContainer).toBeInTheDocument();

    const gallery = container.querySelector('.offer__gallery');
    expect(gallery).toBeInTheDocument();
  });

  test('renders offer title', () => {
    const { container } = renderOffer(true);

    const titleElement = container.querySelector('.offer__name');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders bookmark button', () => {
    const { container } = renderOffer(true);

    const bookmarkButton = container.querySelector('.offer__bookmark-button');
    expect(bookmarkButton).toBeInTheDocument();
    expect(bookmarkButton).toHaveClass('button');
  });

  test('renders rating section', () => {
    const { container } = renderOffer(true);

    const ratingSection = container.querySelector('.offer__rating');
    expect(ratingSection).toBeInTheDocument();
    expect(ratingSection).toHaveClass('rating');

    const ratingValue = container.querySelector('.offer__rating-value');
    expect(ratingValue).toBeInTheDocument();
  });

  test('renders offer features', () => {
    const { container } = renderOffer(true);

    const featuresList = container.querySelector('.offer__features');
    expect(featuresList).toBeInTheDocument();

    const featureItems = container.querySelectorAll('.offer__feature');
    expect(featureItems.length).toBeGreaterThan(0);
  });

  test('renders price section', () => {
    const { container } = renderOffer(true);

    const priceSection = container.querySelector('.offer__price');
    expect(priceSection).toBeInTheDocument();

    const priceValue = container.querySelector('.offer__price-value');
    expect(priceValue).toBeInTheDocument();
  });

  test('renders "What\'s inside" section', () => {
    const { container } = renderOffer(true);

    const insideTitle = container.querySelector('.offer__inside-title');
    expect(insideTitle).toBeInTheDocument();
    expect(insideTitle?.textContent).toContain('What\'s inside');

    const insideList = container.querySelector('.offer__inside-list');
    expect(insideList).toBeInTheDocument();
  });

  test('renders host section', () => {
    const { container } = renderOffer(true);

    const hostTitle = container.querySelector('.offer__host-title');
    expect(hostTitle).toBeInTheDocument();
    expect(hostTitle?.textContent).toContain('Meet the host');

    const avatarWrapper = container.querySelector('.offer__avatar-wrapper');
    expect(avatarWrapper).toBeInTheDocument();
  });

  test('renders reviews section', () => {
    const { container } = renderOffer(true);

    const reviewsSection = container.querySelector('.offer__reviews');
    expect(reviewsSection).toBeInTheDocument();
    expect(reviewsSection).toHaveClass('reviews');
  });

  test('renders ReviewsList component', () => {
    const { container } = renderOffer(true);

    const reviewsList = container.querySelector('.reviews__list');
    expect(reviewsList).toBeInTheDocument();
  });

  test('renders YourReviewForm when user is logged in', () => {
    const { container } = renderOffer(true, AuthorizationStatus.Auth);

    const reviewForm = container.querySelector('.reviews__form');
    expect(reviewForm).toBeInTheDocument();
  });

  test('does not render YourReviewForm when user is not logged in', () => {
    const { container } = renderOffer(true, AuthorizationStatus.NoAuth);

    const reviewForm = container.querySelector('.reviews__form');
    expect(reviewForm).not.toBeInTheDocument();
  });

  test('renders map section', () => {
    const { container } = renderOffer(true);

    const mapSection = container.querySelector('.offer__map');
    expect(mapSection).toBeInTheDocument();
    expect(mapSection).toHaveClass('map');
  });

  test('renders Map component', () => {
    const { container } = renderOffer(true);

    const mapContainer = container.querySelector('div[style*="height: 100%"]');
    expect(mapContainer).toBeInTheDocument();
  });

  test('renders NearOffersList', () => {
    const { container } = renderOffer(true);

    const nearOffersSection = container.querySelector('.near-places');
    expect(nearOffersSection).toBeInTheDocument();
  });

  test('renders all container elements', () => {
    const { container } = renderOffer(true);

    const containers = container.querySelectorAll('.container');
    expect(containers.length).toBeGreaterThan(0);
  });

  test('renders all required CSS classes', () => {
    const { container } = renderOffer(true);

    const expectedClasses = [
      'page',
      'header',
      'page__main',
      'page__main--offer',
      'offer',
      'offer__gallery-container',
      'container',
      'offer__gallery',
      'offer__image-wrapper',
      'offer__image',
      'offer__container',
      'offer__wrapper',
      'offer__name-wrapper',
      'offer__name',
      'offer__bookmark-button',
      'button',
      'offer__bookmark-icon',
      'offer__rating',
      'rating',
      'offer__stars',
      'rating__stars',
      'offer__rating-value',
      'rating__value',
      'offer__features',
      'offer__feature',
      'offer__price',
      'offer__price-value',
      'offer__price-text',
      'offer__inside',
      'offer__inside-title',
      'offer__inside-list',
      'offer__inside-item',
      'offer__host',
      'offer__host-title',
      'offer__avatar-wrapper',
      'user__avatar-wrapper',
      'offer__avatar',
      'user__avatar',
      'offer__user-name',
      'offer__description',
      'offer__text',
      'offer__reviews',
      'reviews',
      'offer__map',
      'map',
      'visually-hidden',
    ];

    expectedClasses.forEach((className) => {
      const elements = container.getElementsByClassName(className);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test('matches snapshot without offer', () => {
    const { container } = renderOffer(false);
    expect(container).toMatchSnapshot();
  });
});
