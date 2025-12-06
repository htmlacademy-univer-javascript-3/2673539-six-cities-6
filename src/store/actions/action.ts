import { createAction } from '@reduxjs/toolkit';
import { OfferCardType, OfferType } from '../../types/offer';
import { CityType } from '../../types/offer';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user';
import { AppRoute } from '../../const';
import { ReviewType } from '../../types/review';

export const changeCity = createAction<CityType>('city/changeCity');

export const loadOffers = createAction<OfferCardType[]>('offers/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<UserData | undefined>('user/setUserData');

export const setFavoriteOffers = createAction<OfferCardType[]>('user/setFavoriteOffers');

export const redirectToRoute = createAction<AppRoute>('auth/redirectToRoute');

export const setCity = createAction<string>('city/setCity');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const setDetailedOffer = createAction<OfferType>('offer/setDetailedOffer');

export const setNearbyOffers = createAction<OfferCardType[]>('offers/setNearbyOffers');

export const setComments = createAction<ReviewType[]>('comments/setComments');

export const addComment = createAction<ReviewType>('comments/addComment');
