import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers } from '../actions/action';
import { OfferCardType } from '../../types/offer';
import { CityType } from '../../types/offer';
import { CitiesEnum } from '../../const';

type State = {
  city: CityType;
  offers: OfferCardType[];
};

const initialState: State = {
  city: { name: CitiesEnum.Amsterdam, location: { latitude: 52.3702, longitude: 4.8952, zoom: 13 } },
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
