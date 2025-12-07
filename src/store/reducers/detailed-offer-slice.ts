import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferType, OfferCardType } from '../../types/offer';

type DetailedOfferState = {
  offer?: OfferType;
  nearbyOffers: OfferCardType[];
};

const initialState: DetailedOfferState = {
  offer: undefined,
  nearbyOffers: [],
};

const detailedOfferSlice = createSlice({
  name: 'detailedOffer',
  initialState,
  reducers: {
    setDetailedOffer(state, action: PayloadAction<OfferType | undefined>) {
      state.offer = action.payload;
    },
    setNearbyOffers(state, action: PayloadAction<OfferCardType[]>) {
      state.nearbyOffers = action.payload;
    },
    updateDetailedOfferFavorite(state, action: PayloadAction<{ offerId: string; isFavorite: boolean }>) {
      const { offerId, isFavorite } = action.payload;
      if (state.offer && state.offer.id === offerId) {
        state.offer.isFavorite = isFavorite;
      }
      const idx = state.nearbyOffers.findIndex((o) => o.id === offerId);
      if (idx !== -1) {
        state.nearbyOffers[idx].isFavorite = isFavorite;
      }
    },
  },
});

export const { setDetailedOffer, setNearbyOffers, updateDetailedOfferFavorite } = detailedOfferSlice.actions;
export default detailedOfferSlice.reducer;
