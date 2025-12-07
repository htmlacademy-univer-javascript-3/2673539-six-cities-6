import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { changeFavoriteAction } from '../../store/actions/api-actions';
import { redirectToRoute } from '../../store/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { RootState } from '../../store';

interface CardProps {
  id: string;
  isPremium?: boolean;
  imageUrl: string;
  price: number;
  isFromFavoritePage?: boolean;
  isFavorite?: boolean;
  rating: number;
  title: string;
  type: string;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

const Card: React.FC<CardProps> = ({
  id,
  isPremium = false,
  imageUrl,
  price,
  isFromFavoritePage: fromFavoritePage = false,
  isFavorite = false,
  rating,
  title,
  type,
  onMouseEnter,
  onMouseLeave,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(((state: RootState) => state.authorizationStatus));

  const handleFavoriteClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }
    const newStatus = isFavorite ? 0 : 1;
    dispatch(changeFavoriteAction({ offerId: id, status: newStatus }));
  }, [authorizationStatus, dispatch, id, isFavorite]);

  const wrapperClass = fromFavoritePage
    ? 'favorites__card place-card'
    : 'cities__card place-card';

  const imageWrapperClass = fromFavoritePage
    ? 'favorites__image-wrapper place-card__image-wrapper'
    : 'cities__image-wrapper place-card__image-wrapper';

  const infoWrapperClass = fromFavoritePage
    ? 'favorites__card-info place-card__info'
    : 'place-card__info';

  const imageWidth = fromFavoritePage ? 150 : 260;
  const imageHeight = fromFavoritePage ? 110 : 200;

  return (
    <article
      className={wrapperClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={imageWrapperClass}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={imageUrl}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>

      <div className={infoWrapperClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              isFavorite ? 'place-card__bookmark-button--active' : ''
            }`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default Card;
