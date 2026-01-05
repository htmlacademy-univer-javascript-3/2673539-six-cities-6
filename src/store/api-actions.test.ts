import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { createAPI } from '../services/api.ts';
import {
  fetchOffersAction,
  fetchFavoriteOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  fetchDetailedOfferAction,
  postCommentAction,
  changeFavoriteAction,
} from './api-actions.ts';
import {
  requireAuthorization,
  setUserData,
  setFavoriteOffers,
  addFavoriteOffer,
  removeFavoriteOffer,
} from './reducers/user-slice.ts';
import { setComments, addComment } from './reducers/comments-slice.ts';
import { setDetailedOffer, setNearbyOffers } from './reducers/detailed-offer-slice.ts';
import { AuthorizationStatus } from '../const.ts';
import faker from 'faker';
import { AnyAction } from '@reduxjs/toolkit';
import {createRandomUserInfo} from '../utils/create-random-user-info.ts';
import {createRandomOffer} from '../utils/create-random-offer.ts';
import {createRandomReview} from '../utils/create-random-review.ts';
import {createRandomDetailedOffer} from '../utils/create-random-detailed-offer.ts';
import {store as actualStore} from '../store'; // Переименуем импорт

type State = ReturnType<typeof actualStore.getState>;

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  AnyAction,
  ThunkDispatch<State, AxiosInstance, AnyAction>
>(middlewares);

describe('Async actions', () => {
  let mockStoreInstance = mockStore(); // Изменяем имя переменной

  beforeEach(() => {
    mockStoreInstance = mockStore(); // Используем новое имя
  });

  it('should dispatch fetchFavoriteOffersAction and set favorite offers', async () => {
    const mockFavoriteOffers = [
      createRandomOffer(),
      createRandomOffer(),
    ];

    api.get = vi.fn().mockResolvedValue({ data: mockFavoriteOffers });

    await mockStoreInstance.dispatch(fetchFavoriteOffersAction()); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(fetchFavoriteOffersAction.pending.type);
    expect(actions[1].type).toBe(setFavoriteOffers.type);
    expect(actions[1].payload).toEqual(mockFavoriteOffers);
  });

  it('should dispatch checkAuthAction and set authorization status to Auth', async () => {
    const userInfoMock = createRandomUserInfo();

    api.get = vi.fn().mockResolvedValue({ data: userInfoMock });

    await mockStoreInstance.dispatch(checkAuthAction()); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(checkAuthAction.pending.type);
    expect(actions[1].type).toBe(requireAuthorization.type);
    expect(actions[1].payload).toEqual(AuthorizationStatus.Auth);
    expect(actions[2].type).toBe(setUserData.type);
    expect(actions[2].payload).toEqual(userInfoMock);
    expect(actions[3].type).toBe(fetchFavoriteOffersAction.pending.type);
  });

  it('should dispatch checkAuthAction and set authorization status to NoAuth on error', async () => {
    api.get = vi.fn().mockRejectedValue(new Error('Unauthorized'));

    await mockStoreInstance.dispatch(checkAuthAction()); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(checkAuthAction.pending.type);
    expect(actions[1].type).toBe(requireAuthorization.type);
    expect(actions[1].payload).toEqual(AuthorizationStatus.NoAuth);
  });

  it('should dispatch loginAction and set user data', async () => {
    const mockAuthData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const mockUserInfo = createRandomUserInfo();

    api.post = vi.fn().mockResolvedValue({ data: mockUserInfo });

    await mockStoreInstance.dispatch(loginAction(mockAuthData)); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(loginAction.pending.type);
    expect(actions[1].type).toBe(requireAuthorization.type);
    expect(actions[1].payload).toEqual(AuthorizationStatus.Auth);
    expect(actions[2].type).toBe(setUserData.type);
    expect(actions[2].payload).toEqual(mockUserInfo);
    expect(actions[3].type).toBe(fetchOffersAction.pending.type);
  });

  it('should dispatch logoutAction and reset user data', async () => {
    api.delete = vi.fn().mockResolvedValue({});

    await mockStoreInstance.dispatch(logoutAction()); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(logoutAction.pending.type);
    expect(actions[1].type).toBe(requireAuthorization.type);
    expect(actions[1].payload).toEqual(AuthorizationStatus.NoAuth);
    expect(actions[2].type).toBe(setUserData.type);
    expect(actions[3].type).toBe(setFavoriteOffers.type);
    expect(actions[3].payload).toEqual([]);
  });

  it('should dispatch fetchNearbyOffersAction and set nearby offers', async () => {
    const mockOfferId = faker.datatype.uuid();
    const mockNearbyOffers = [
      createRandomOffer(),
      createRandomOffer(),
    ];

    api.get = vi.fn().mockResolvedValue({ data: mockNearbyOffers });

    await mockStoreInstance.dispatch(fetchNearbyOffersAction(mockOfferId)); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(fetchNearbyOffersAction.pending.type);
    expect(actions[1].type).toBe(setNearbyOffers.type);
    expect(actions[1].payload).toEqual(mockNearbyOffers.slice(0, 3));
  });

  it('should dispatch fetchCommentsAction and set comments', async () => {
    const mockOfferId = faker.datatype.uuid();
    const mockComments = [
      createRandomReview(),
      createRandomReview(),
    ];

    api.get = vi.fn().mockResolvedValue({ data: mockComments });

    await mockStoreInstance.dispatch(fetchCommentsAction(mockOfferId)); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(fetchCommentsAction.pending.type);
    expect(actions[1].type).toBe(setComments.type);
    expect(actions[1].payload).toEqual(mockComments);
  });

  it('should dispatch fetchDetailedOfferAction and set detailed offer', async () => {
    const mockDetailedOffer = createRandomDetailedOffer();

    api.get = vi.fn().mockResolvedValue({ data: mockDetailedOffer });

    await mockStoreInstance.dispatch(fetchDetailedOfferAction(mockDetailedOffer.id)); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(fetchDetailedOfferAction.pending.type);
    expect(actions[1].type).toBe(setDetailedOffer.type);
    expect(actions[1].payload).toEqual(mockDetailedOffer);
    expect(actions[2].type).toBe(fetchNearbyOffersAction.pending.type);
  });

  it('should dispatch postCommentAction and add comment', async () => {
    const mockOfferId = faker.datatype.uuid();
    const mockReview = createRandomReview();

    api.post = vi.fn().mockResolvedValue({ data: mockReview });

    await mockStoreInstance.dispatch(postCommentAction({ offerId: mockOfferId, ...mockReview })); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(postCommentAction.pending.type);
    expect(actions[1].type).toBe(addComment.type);
    expect(actions[1].payload).toEqual(mockReview);
  });

  it('should dispatch changeFavoriteAction and add favorite offer', async () => {
    const mockOffer = createRandomOffer();

    api.post = vi.fn().mockResolvedValue({ data: mockOffer });

    await mockStoreInstance.dispatch(changeFavoriteAction({ offerId: mockOffer.id, status: 1 })); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(changeFavoriteAction.pending.type);
    expect(actions[1].type).toBe(addFavoriteOffer.type);
    expect(actions[1].payload).toEqual(mockOffer);
  });

  it('should dispatch changeFavoriteAction and remove favorite offer', async () => {
    const mockOffer = createRandomOffer();

    api.post = vi.fn().mockResolvedValue({ data: mockOffer });

    await mockStoreInstance.dispatch(changeFavoriteAction({ offerId: mockOffer.id, status: 0 })); // Используем новое имя

    const actions = mockStoreInstance.getActions(); // Используем новое имя
    expect(actions[0].type).toBe(changeFavoriteAction.pending.type);
    expect(actions[1].type).toBe(removeFavoriteOffer.type);
    expect(actions[1].payload).toEqual(mockOffer.id);
  });
});
