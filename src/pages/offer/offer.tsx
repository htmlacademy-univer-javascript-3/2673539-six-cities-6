import React from 'react';
import Header from '../../components/header/header';
import YourReviewForm from '../../components/your-review-form/your-review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { oneOffer } from '../../mocks/one-offer';
import Map from '../../components/map/map';
import { nearOffersMock } from '../../mocks/near-offers';
import NearOffersList from '../../components/nearby-offers-list/near-offers-list';

const IsLogged = true;

const Offer: React.FC = () => {
  const offer = oneOffer;

  return (
    <div className="page">
      <Header userEmail='Oliver.conner@gmail.com' favoriteCount={3} isLoggedIn />

      <main className="page__main page__main--offer">
        <section className="offer">

          {/* Галерея */}
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image, index) => (
                <div key={index} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={offer.title} />
                </div>
              ))}
            </div>
          </div>

          {/* Основная часть */}
          <div className="offer__container container">
            <div className="offer__wrapper">
              
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
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

              {/* Рейтинг */}
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating.toFixed(1)}</span>
              </div>

              {/* Характеристики */}
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adult{offer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>

              {/* Цена */}
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              {/* Удобства */}
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((item, index) => (
                    <li key={index} className="offer__inside-item">{item}</li>
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
                <ReviewsList />
                {IsLogged && <YourReviewForm />}
              </section>
            </div>
          </div>

          <section className="offer__map map">
            {/* потом поменять на реальные данные */}
            <Map city={nearOffersMock[3].city} offers={nearOffersMock} currentOffer={nearOffersMock[3]}></Map>
          </section>
        </section>

        {/* Блок "Other places" */}
        <div className="container">
          <NearOffersList offers={nearOffersMock}></NearOffersList>
        </div>
      </main>
    </div>
  );
};

export default Offer;
