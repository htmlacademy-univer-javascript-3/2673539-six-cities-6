import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user';
import { OfferCardType } from '../../types/offer';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData?: UserData;
  favoriteOffers: OfferCardType[];
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  userData: undefined,
  favoriteOffers: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requireAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUserData(state, action: PayloadAction<UserData | undefined>) {
      state.userData = action.payload;
    },
    setFavoriteOffers(state, action: PayloadAction<OfferCardType[]>) {
      state.favoriteOffers = action.payload;
    },
    addFavoriteOffer(state, action: PayloadAction<OfferCardType>) {
      const updated = action.payload;
      const index = state.favoriteOffers.findIndex((o) => o.id === updated.id);
      if (index === -1) {
        state.favoriteOffers.push(updated);
      } else {
        state.favoriteOffers[index] = updated;
      }
    },
    removeFavoriteOffer(state, action: PayloadAction<string>) {
      state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload);
    },
    updateFavoriteStatusInFavorites(state, action: PayloadAction<{ offerId: string; isFavorite: boolean }>) {
      const { offerId, isFavorite } = action.payload;
      if (!isFavorite) {
        state.favoriteOffers = state.favoriteOffers.filter((o) => o.id !== offerId);
      } else {
      }
    },
  },
});

export const {
  requireAuthorization,
  setUserData,
  setFavoriteOffers,
  addFavoriteOffer,
  removeFavoriteOffer,
  updateFavoriteStatusInFavorites,
} = userSlice.actions;
export default userSlice.reducer;
