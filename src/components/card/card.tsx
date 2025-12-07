import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { changeFavoriteAction } from '../../store/api-actions';
import redirectToRoute from '../../store/redirect-action-placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { RootState } from '../../store';
import { OfferCardType } from '../../types/offer';

interface CardProps {
  offer: OfferCardType
  isFromFavoritePage?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

const Card: React.FC<CardProps> = ({
  offer,
  isFromFavoritePage = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(((state: RootState) => state.userState.authorizationStatus));

  const handleFavoriteClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }
    const newStatus = offer.isFavorite ? 0 : 1;
    dispatch(changeFavoriteAction({ offerId: offer.id, status: newStatus }));
  }, [authorizationStatus, dispatch, offer.id, offer.isFavorite]);

  const wrapperClass = isFromFavoritePage
    ? 'favorites__card place-card'
    : 'cities__card place-card';

  const imageWrapperClass = isFromFavoritePage
    ? 'favorites__image-wrapper place-card__image-wrapper'
    : 'cities__image-wrapper place-card__image-wrapper';

  const infoWrapperClass = isFromFavoritePage
    ? 'favorites__card-info place-card__info'
    : 'place-card__info';

  const imageWidth = isFromFavoritePage ? 150 : 260;
  const imageHeight = isFromFavoritePage ? 110 : 200;

  return (
    <article
      className={wrapperClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={imageWrapperClass}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>

      <div className={infoWrapperClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default Card;
