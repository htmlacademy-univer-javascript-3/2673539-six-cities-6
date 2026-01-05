import userReducer, {
  requireAuthorization,
  setUserData,
  setFavoriteOffers,
  addFavoriteOffer,
  removeFavoriteOffer,
  updateFavoriteStatusInFavorites
} from './user-slice';
import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user';
import { OfferCardType } from '../../types/offer';
import { createRandomOffer } from '../../utils/create-random-offer';

describe('User Reducer', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: undefined,
    favoriteOffers: [],
  };

  const createMockUser = (): UserData => ({
    name: 'John Doe',
    avatarUrl: 'path/to/avatar.jpg',
    isPro: true,
    email: 'test@example.com',
    token: 'test-jwt-token-123',
  });

  const createMockOffer = (id: string, isFavorite = true): OfferCardType => {
    const offer = createRandomOffer();
    return {
      ...offer,
      id,
      title: `Favorite Offer ${id}`,
      isFavorite,
    };
  };

  test('should return initial state with default reducer', () => {
    const result = userReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  test('should handle requireAuthorization action', () => {
    const actionAuth = requireAuthorization(AuthorizationStatus.Auth);
    let result = userReducer(initialState, actionAuth);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.userData).toBeUndefined();

    const actionNoAuth = requireAuthorization(AuthorizationStatus.NoAuth);
    result = userReducer(result, actionNoAuth);

    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  test('should handle setUserData action', () => {
    const testUser = createMockUser();

    const action = setUserData(testUser);
    const result = userReducer(initialState, action);

    expect(result.userData).toEqual(testUser);
    expect(result.userData?.email).toBe('test@example.com');
    expect(result.userData?.name).toBe('John Doe');
    expect(result.userData?.isPro).toBe(true);
    expect(result.userData?.token).toBe('test-jwt-token-123');
  });

  test('should handle setUserData with undefined', () => {
    const action = setUserData(undefined);
    const result = userReducer(initialState, action);

    expect(result.userData).toBeUndefined();
  });

  test('should handle setFavoriteOffers action', () => {
    const testFavoriteOffers = [
      createMockOffer('favorite-1'),
      createMockOffer('favorite-2'),
      createMockOffer('favorite-3'),
    ];

    const action = setFavoriteOffers(testFavoriteOffers);
    const result = userReducer(initialState, action);

    expect(result.favoriteOffers).toEqual(testFavoriteOffers);
    expect(result.favoriteOffers).toHaveLength(3);
    expect(result.favoriteOffers[0].id).toBe('favorite-1');
    expect(result.favoriteOffers[1].title).toBe('Favorite Offer favorite-2');
  });

  test('should handle addFavoriteOffer action', () => {
    const testOffer = createMockOffer('new-favorite');

    const action = addFavoriteOffer(testOffer);
    const result = userReducer(initialState, action);

    expect(result.favoriteOffers).toEqual([testOffer]);
    expect(result.favoriteOffers).toHaveLength(1);
    expect(result.favoriteOffers[0].id).toBe('new-favorite');
    expect(result.favoriteOffers[0].isFavorite).toBe(true);
  });

  test('should update existing favorite when adding duplicate offer', () => {
    const originalOffer = createMockOffer('duplicate-id');
    const updatedOffer = { ...originalOffer, title: 'Updated Title' };

    let state = userReducer(initialState, addFavoriteOffer(originalOffer));

    const action = addFavoriteOffer(updatedOffer);
    state = userReducer(state, action);

    expect(state.favoriteOffers).toHaveLength(1);
    expect(state.favoriteOffers[0].id).toBe('duplicate-id');
    expect(state.favoriteOffers[0].title).toBe('Updated Title');
  });

  test('should handle removeFavoriteOffer action', () => {
    const testFavoriteOffers = [
      createMockOffer('to-keep'),
      createMockOffer('to-remove'),
      createMockOffer('another-to-keep'),
    ];

    let state = userReducer(initialState, setFavoriteOffers(testFavoriteOffers));

    const action = removeFavoriteOffer('to-remove');
    state = userReducer(state, action);

    expect(state.favoriteOffers).toHaveLength(2);
    expect(state.favoriteOffers[0].id).toBe('to-keep');
    expect(state.favoriteOffers[1].id).toBe('another-to-keep');
    expect(state.favoriteOffers.find((o) => o.id === 'to-remove')).toBeUndefined();
  });

  test('should handle updateFavoriteStatusInFavorites action', () => {
    const testFavoriteOffers = [
      createMockOffer('favorite-1', true),
      createMockOffer('favorite-2', true),
      createMockOffer('favorite-3', true),
    ];

    let state = userReducer(initialState, setFavoriteOffers(testFavoriteOffers));

    const action = updateFavoriteStatusInFavorites({ offerId: 'favorite-2', isFavorite: false });
    state = userReducer(state, action);

    expect(state.favoriteOffers).toHaveLength(2);
    expect(state.favoriteOffers[0].id).toBe('favorite-1');
    expect(state.favoriteOffers[1].id).toBe('favorite-3');
    expect(state.favoriteOffers.find((o) => o.id === 'favorite-2')).toBeUndefined();
  });

  test('should not mutate state when setting user data', () => {
    const testUser = createMockUser();
    const action = setUserData(testUser);
    const result = userReducer(initialState, action);

    expect(result).not.toBe(initialState);
    expect(initialState.userData).toBeUndefined();
    expect(result.userData).toEqual(testUser);
  });

  test('should create correct action creators', () => {
    const testUser = createMockUser();
    const testFavoriteOffers = [createMockOffer('favorite-1')];
    const testOffer = createMockOffer('test-offer');

    const requireAuthAction = requireAuthorization(AuthorizationStatus.Auth);
    const expectedRequireAuthAction = {
      type: 'user/requireAuthorization',
      payload: AuthorizationStatus.Auth,
    };

    const setUserDataAction = setUserData(testUser);
    const expectedSetUserDataAction = {
      type: 'user/setUserData',
      payload: testUser,
    };

    const setFavoritesAction = setFavoriteOffers(testFavoriteOffers);
    const expectedSetFavoritesAction = {
      type: 'user/setFavoriteOffers',
      payload: testFavoriteOffers,
    };

    const addFavoriteAction = addFavoriteOffer(testOffer);
    const expectedAddFavoriteAction = {
      type: 'user/addFavoriteOffer',
      payload: testOffer,
    };

    const removeFavoriteAction = removeFavoriteOffer('test-id');
    const expectedRemoveFavoriteAction = {
      type: 'user/removeFavoriteOffer',
      payload: 'test-id',
    };

    const updateFavoriteStatusAction = updateFavoriteStatusInFavorites({ offerId: 'test-id', isFavorite: false });
    const expectedUpdateFavoriteStatusAction = {
      type: 'user/updateFavoriteStatusInFavorites',
      payload: { offerId: 'test-id', isFavorite: false },
    };

    expect(requireAuthAction).toEqual(expectedRequireAuthAction);
    expect(requireAuthAction.type).toBe('user/requireAuthorization');
    expect(requireAuthAction.payload).toBe(AuthorizationStatus.Auth);

    expect(setUserDataAction).toEqual(expectedSetUserDataAction);
    expect(setUserDataAction.type).toBe('user/setUserData');
    expect(setUserDataAction.payload).toBe(testUser);

    expect(setFavoritesAction).toEqual(expectedSetFavoritesAction);
    expect(setFavoritesAction.type).toBe('user/setFavoriteOffers');
    expect(setFavoritesAction.payload).toBe(testFavoriteOffers);

    expect(addFavoriteAction).toEqual(expectedAddFavoriteAction);
    expect(addFavoriteAction.type).toBe('user/addFavoriteOffer');
    expect(addFavoriteAction.payload).toBe(testOffer);

    expect(removeFavoriteAction).toEqual(expectedRemoveFavoriteAction);
    expect(removeFavoriteAction.type).toBe('user/removeFavoriteOffer');
    expect(removeFavoriteAction.payload).toBe('test-id');

    expect(updateFavoriteStatusAction).toEqual(expectedUpdateFavoriteStatusAction);
    expect(updateFavoriteStatusAction.type).toBe('user/updateFavoriteStatusInFavorites');
    expect(updateFavoriteStatusAction.payload.offerId).toBe('test-id');
    expect(updateFavoriteStatusAction.payload.isFavorite).toBe(false);
  });

  test('should handle empty favorite offers array correctly', () => {
    const action = setFavoriteOffers([]);
    const result = userReducer(initialState, action);

    expect(result.favoriteOffers).toEqual([]);
    expect(result.favoriteOffers).toHaveLength(0);
  });

  test('should maintain data immutability when updating state', () => {
    const firstState = userReducer(initialState, setUserData(createMockUser()));
    const secondState = userReducer(firstState, setFavoriteOffers([createMockOffer('favorite-1')]));

    expect(firstState).not.toBe(secondState);
    expect(firstState.userData?.email).toBe('test@example.com');
    expect(secondState.userData?.email).toBe('test@example.com');
    expect(secondState.favoriteOffers[0].id).toBe('favorite-1');
  });

  test('should handle removeFavoriteOffer when offer does not exist', () => {
    const testFavoriteOffers = [createMockOffer('existing-offer')];
    let state = userReducer(initialState, setFavoriteOffers(testFavoriteOffers));

    const action = removeFavoriteOffer('non-existent-id');
    state = userReducer(state, action);

    expect(state.favoriteOffers).toHaveLength(1);
    expect(state.favoriteOffers[0].id).toBe('existing-offer');
  });

  test('should handle updateFavoriteStatusInFavorites when isFavorite is true', () => {
    const testFavoriteOffers = [createMockOffer('favorite-1', true)];
    let state = userReducer(initialState, setFavoriteOffers(testFavoriteOffers));

    const action = updateFavoriteStatusInFavorites({ offerId: 'favorite-1', isFavorite: true });
    state = userReducer(state, action);

    expect(state.favoriteOffers).toHaveLength(1);
    expect(state.favoriteOffers[0].id).toBe('favorite-1');
  });

  test('should handle multiple state updates correctly', () => {
    let state = userReducer(initialState, requireAuthorization(AuthorizationStatus.Auth));
    state = userReducer(state, setUserData(createMockUser()));
    state = userReducer(state, setFavoriteOffers([createMockOffer('favorite-1')]));
    state = userReducer(state, addFavoriteOffer(createMockOffer('favorite-2')));
    state = userReducer(state, removeFavoriteOffer('favorite-1'));

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.userData?.email).toBe('test@example.com');
    expect(state.favoriteOffers).toHaveLength(1);
    expect(state.favoriteOffers[0].id).toBe('favorite-2');
  });

  test('should preserve all user properties when setting user data', () => {
    const userWithAllProperties: UserData = {
      name: 'Complete User',
      avatarUrl: 'avatar/complete.jpg',
      isPro: false,
      email: 'complete@user.com',
      token: 'jwt-token-456',
    };

    const action = setUserData(userWithAllProperties);
    const result = userReducer(initialState, action);

    expect(result.userData?.name).toBe('Complete User');
    expect(result.userData?.avatarUrl).toBe('avatar/complete.jpg');
    expect(result.userData?.isPro).toBe(false);
    expect(result.userData?.email).toBe('complete@user.com');
    expect(result.userData?.token).toBe('jwt-token-456');
  });

  test('should handle user without pro status', () => {
    const regularUser: UserData = {
      name: 'Regular User',
      avatarUrl: 'avatar/regular.jpg',
      isPro: false,
      email: 'regular@user.com',
      token: 'regular-token',
    };

    const action = setUserData(regularUser);
    const result = userReducer(initialState, action);

    expect(result.userData?.isPro).toBe(false);
    expect(result.userData?.name).toBe('Regular User');
  });

  test('should handle updateFavoriteStatusInFavorites for multiple offers', () => {
    const testFavoriteOffers = [
      createMockOffer('offer-1', true),
      createMockOffer('offer-2', true),
      createMockOffer('offer-3', true),
    ];

    let state = userReducer(initialState, setFavoriteOffers(testFavoriteOffers));

    state = userReducer(state, updateFavoriteStatusInFavorites({ offerId: 'offer-1', isFavorite: false }));
    state = userReducer(state, updateFavoriteStatusInFavorites({ offerId: 'offer-3', isFavorite: false }));

    expect(state.favoriteOffers).toHaveLength(1);
    expect(state.favoriteOffers[0].id).toBe('offer-2');
  });
});
