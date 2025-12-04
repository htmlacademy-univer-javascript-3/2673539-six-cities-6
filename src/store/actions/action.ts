import { createAction } from '@reduxjs/toolkit';
import { OfferCardType } from '../../types/offer';
import { CityType } from '../../types/offer';

export const changeCity = createAction<CityType>('city/changeCity');

export const loadOffers = createAction<OfferCardType[]>('offers/loadOffers');
