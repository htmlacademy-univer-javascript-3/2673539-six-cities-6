import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferCardType } from '../../types/offer';
import { APIRoute } from '../../const';
import { loadOffers, setOffersDataLoadingStatus } from './action';
import { AppDispatch } from '../index.ts';

export const fetchOffersAction = createAsyncThunk<
  OfferCardType[],
  void,
  { dispatch: AppDispatch; extra: AxiosInstance; }
>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));

    await new Promise((resolve) => setTimeout(resolve, 5000)); // задержка в 5 секунд чтоб проверить экран загрузки

    const { data } = await api.get<OfferCardType[]>(APIRoute.Offers);

    dispatch(loadOffers(data));
    dispatch(setOffersDataLoadingStatus(false));

    return data;
  }
);
