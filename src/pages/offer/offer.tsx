import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Header from '../../components/header/header';
import YourReviewForm from '../../components/your-review-form/your-review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import NearOffersList from '../../components/nearby-offers-list/near-offers-list';

import { AppDispatch, RootState } from '../../store';
import {
  fetchDetailedOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  changeFavoriteAction
} from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

const Offer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { offerId } = useParams<{ offerId: string }>();

  const offer = useSelector((state: RootState) => state.detailedOfferState.offer);
  const nearbyOffers = useSelector((state: RootState) => state.detailedOfferState.nearbyOffers);
  const comments = useSelector((state: RootState) => state.commentsState.comments);
  const authorizationStatus = useSelector((state: RootState) => state.userState.authorizationStatus);

  const isLogged = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (offerId) {
      dispatch(fetchDetailedOfferAction(offerId));
      dispatch(fetchNearbyOffersAction(offerId));
      dispatch(fetchCommentsAction(offerId));
    }
  }, [dispatch, offerId]);

  const handleFavoriteClick = useCallback(() => {
    if (!offer) {
      return;
    }

    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    const newStatus = offer.isFavorite ? 0 : 1;
    dispatch(changeFavoriteAction({ offerId: offer.id, status: newStatus }));
  }, [authorizationStatus, dispatch, offer]);

  if (!offer) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <h2 style={{ padding: 40 }}>Offer not found</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && <div className="offer__mark"><span>Premium</span></div>}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    offer.isFavorite ? 'offer__bookmark-button--active' : ''
                  }`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating.toFixed(1)}</span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adult{offer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text"> night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What's inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((item) => (
                    <li key={item} className="offer__inside-item">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className={`offer__avatar-wrapper user__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                  <img
                    className="offer__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">{offer.host.name}</span>
                {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>

              <section className="offer__reviews reviews">
                <ReviewsList reviews={comments} />
                {isLogged && <YourReviewForm offerId={offer.id} />}
              </section>
            </div>
          </div>

          <section className="offer__map map">
            <Map city={offer.city} offers={[offer, ...nearbyOffers]} currentOffer={offer} />
          </section>
        </section>

        <div className="container">
          <NearOffersList offers={nearbyOffers} />
        </div>
      </main>
    </div>
  );
};

export default Offer;
