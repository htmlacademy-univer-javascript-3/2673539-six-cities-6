import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setOffersDataLoadingStatus } from '../actions/action';
import { OfferCardType } from '../../types/offer';
import { CityType } from '../../types/offer';
import { CitiesEnum } from '../../const';

type State = {
  city: CityType;
  offers: OfferCardType[];
  isOffersDataLoading: boolean
};

const initialState: State = {
  city: { name: CitiesEnum.Amsterdam, location: { latitude: 52.3702, longitude: 4.8952, zoom: 13 } }, // надо будет как-то поправить
  offers: [],
  isOffersDataLoading: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
