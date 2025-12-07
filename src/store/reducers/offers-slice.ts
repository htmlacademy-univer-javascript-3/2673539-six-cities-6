import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferCardType } from '../../types/offer';

export type OffersState = {
  offers: OfferCardType[];
  isOffersDataLoading: boolean;
};

const initialState: OffersState = {
  offers: [],
  isOffersDataLoading: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    loadOffers(state, action: PayloadAction<OfferCardType[]>) {
      state.offers = action.payload;
    },
    setOffersDataLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isOffersDataLoading = action.payload;
    },
    updateOfferFavoriteStatus(state, action: PayloadAction<{ offerId: string; isFavorite: boolean }>) {
      const { offerId, isFavorite } = action.payload;
      const offer = state.offers.find((o) => o.id === offerId);
      if (offer) {
        offer.isFavorite = isFavorite;
      }
    },
  },
});

export const { loadOffers, setOffersDataLoadingStatus, updateOfferFavoriteStatus } = offersSlice.actions;
export default offersSlice.reducer;
