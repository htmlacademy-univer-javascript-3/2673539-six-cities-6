import { createReducer } from '@reduxjs/toolkit';
import { OfferCardType } from '../../types/offer';
import { CityType } from '../../types/offer';
import { CitiesEnum } from '../../const';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user';
import { OfferType } from '../../types/offer';
import { ReviewType } from '../../types/review';
import {
  changeCity,
  loadOffers,
  setOffersDataLoadingStatus,
  setFavoriteOffers,
  requireAuthorization,
  setUserData,
  setDetailedOffer,
  setNearbyOffers,
  setComments,
  addComment,
  addFavoriteOffer,
  removeFavoriteOffer,
} from '../actions/action';
import { changeFavoriteAction } from '../actions/api-actions';

type State = {
  city: CityType;
  offers: OfferCardType[];
  isOffersDataLoading: boolean;
  favoriteOffers: OfferCardType[];
  authorizationStatus: AuthorizationStatus;
  userData: UserData | undefined;
  offer: OfferType | undefined;
  nearbyOffers: OfferCardType[];
  comments: ReviewType[];
};

const initialState: State = {
  city: { name: CitiesEnum.Amsterdam, location: { latitude: 52.3702, longitude: 4.8952, zoom: 13 } }, // надо будет как-то поправить
  offers: [],
  isOffersDataLoading: false,
  favoriteOffers: [],
  authorizationStatus: AuthorizationStatus.NoAuth, //
  userData: undefined,
  offer: undefined,
  nearbyOffers: [],
  comments: [],
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setDetailedOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.comments.push(action.payload);
    })
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(addFavoriteOffer, (state, action) => {
      const updated = action.payload;
      const index = state.favoriteOffers.findIndex(o => o.id === updated.id);

      if (index === -1) {
        state.favoriteOffers.push(updated);
      } else {
        state.favoriteOffers[index] = updated;
      }
    })
    .addCase(removeFavoriteOffer, (state, action) => {
      state.favoriteOffers = state.favoriteOffers.filter(
        (offer) => offer.id !== action.payload
      );
    })
    .addCase(changeFavoriteAction.fulfilled, (state, action) => {
      const { offerId, status } = action.payload;
      const isFavorite = status === 1;

      const offer = state.offers.find((o) => o.id === offerId);
      if (offer) {
        offer.isFavorite = isFavorite;
      }
    });
})

