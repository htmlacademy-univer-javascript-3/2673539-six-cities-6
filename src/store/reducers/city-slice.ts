import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityType } from '../../types/offer';
import { CitiesEnum } from '../../const';

export type CityState = {
  city: CityType;
};

const initialState: CityState = {
  city: {
    name: CitiesEnum.Amsterdam,
    location: { latitude: 52.3702, longitude: 4.8952, zoom: 13 },
  },
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<CityType>) {
      state.city = action.payload;
    },
  },
});

export const { changeCity } = citySlice.actions;
export default citySlice.reducer;
