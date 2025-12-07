import React, { useEffect } from 'react';
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
  fetchCommentsAction
} from '../../store/actions/api-actions';


const Offer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // 1. Достаём ID из URL
  const { offerId } = useParams<{ offerId: string }>();

  // 2. Берём данные из Redux
  const offer = useSelector((state: RootState) => state.offer);
  const nearbyOffers = useSelector((state: RootState) => state.nearbyOffers);
  const comments = useSelector((state: RootState) => state.comments);
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  const isLogged = authorizationStatus === 'AUTH';

  // 3. Запрашиваем данные при заходе на страницу
  useEffect(() => {
    if (offerId) {
      dispatch(fetchDetailedOfferAction(offerId));
      dispatch(fetchNearbyOffersAction(offerId));
      dispatch(fetchCommentsAction(offerId));
    }
  }, [dispatch, offerId]);


  // ➤ Если offer не найден (API вернул 404)
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

          {/* Галерея */}
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

              {offer.isPremium && (
                <div className="offer__mark"><span>Premium</span></div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
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

              {/* Хост */}
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>

                <div className="offer__host-user user">
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
                </div>

                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>

              {/* Отзывы */}
              <section className="offer__reviews reviews">
                <ReviewsList reviews={comments} />
                {isLogged && <YourReviewForm />}
                {/* {isLogged && <YourReviewForm offerId={offer.id.toString()} />} */}
              </section>

            </div>
          </div>

          {/* Карта */}
          <section className="offer__map map">
            <Map
              city={offer.city}
              offers={nearbyOffers}
              currentOffer={offer}
            />
          </section>
        </section>

        {/* Блок похожих предложений */}
        <div className="container">
          <NearOffersList offers={nearbyOffers} />
        </div>
      </main>
    </div>
  );
};

export default Offer;
