import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from './index';
import { AuthData, UserData } from '../types/user';
import { OfferCardType, OfferType } from '../types/offer';
import { ReviewType } from '../types/review';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { saveToken, dropToken } from '../token';
import { redirectToRoute as redirectActionCreator } from './redirect-action-placeholder';

import { loadOffers, setOffersDataLoadingStatus, updateOfferFavoriteStatus } from './reducers/offers-slice';
import { requireAuthorization, setUserData, setFavoriteOffers, addFavoriteOffer, removeFavoriteOffer } from './reducers/user-slice';
import { setDetailedOffer, setNearbyOffers, updateDetailedOfferFavorite } from './reducers/detailed-offer-slice';
import { setComments, addComment } from './reducers/comments-slice';


export const fetchOffersAction = createAsyncThunk<
  OfferCardType[],
  undefined,
  { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }
>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await api.get<OfferCardType[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setOffersDataLoadingStatus(false));
    return data;
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }>(
  'data/fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferCardType[]>(APIRoute.Favorite);
    dispatch(setFavoriteOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const response = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(response.data));
      await dispatch(fetchFavoriteOffersAction());
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const response = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(response.data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(response.data));
    await dispatch(fetchOffersAction());
    await dispatch(fetchFavoriteOffersAction());
    dispatch(redirectActionCreator(AppRoute.Root));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      // Если запрос на выход не удался, все равно очищаем токен и сбрасываем состояние
      await api.delete(APIRoute.Logout);
    } finally {
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserData(undefined));
      dispatch(setFavoriteOffers([]));
    }
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }>(
  'data/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferCardType[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(setNearbyOffers(data.slice(0, 3)));
  }
);

export const fetchDetailedOfferAction = createAsyncThunk<void, string, { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }>(
  'data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
    dispatch(setDetailedOffer(data));
    await dispatch(fetchNearbyOffersAction(offerId));
  }
);

export const fetchCommentsAction = createAsyncThunk<void, string, { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }>(
  'data/fetchComments',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<ReviewType[]>(`${APIRoute.Comments}/${offerId}`);
    dispatch(setComments(data));
  }
);

export const postCommentAction = createAsyncThunk<void, { offerId: string; comment: string; rating: number }, { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }>(
  'data/postComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<ReviewType>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    dispatch(addComment(data));
  }
);

export const changeFavoriteAction = createAsyncThunk<
  { offerId: string; status: number; updatedOffer: OfferCardType | null },
  { offerId: string; status: number },
  { dispatch: AppDispatch; state: RootState; extra: AxiosInstance }
>(
  'data/changeFavorite',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferCardType>(`${APIRoute.Favorite}/${offerId}/${status}`);
    if (status === 1) {
      dispatch(addFavoriteOffer(data));
    } else {
      dispatch(removeFavoriteOffer(data.id));
    }

    const isFavorite = status === 1;
    dispatch(updateOfferFavoriteStatus({ offerId, isFavorite }));
    dispatch(updateDetailedOfferFavorite({ offerId, isFavorite }));

    return { offerId, status, updatedOffer: data };
  }
);
