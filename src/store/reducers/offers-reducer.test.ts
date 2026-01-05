import offersReducer, { loadOffers, setOffersDataLoadingStatus, updateOfferFavoriteStatus } from './offers-slice';
import { OfferCardType } from '../../types/offer';
import { createRandomOffer } from '../../utils/create-random-offer';

describe('Offers Reducer', () => {
  const initialState = {
    offers: [],
    isOffersDataLoading: false,
  };

  const createMockOffer = (id: string, isFavorite = false): OfferCardType => {
    const offer = createRandomOffer();
    return {
      ...offer,
      id,
      title: `Test Offer ${id}`,
      isFavorite,
    };
  };

  test('should return initial state with default reducer', () => {
    const result = offersReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  test('should handle loadOffers action', () => {
    const testOffers = [
      createMockOffer('offer-1'),
      createMockOffer('offer-2'),
      createMockOffer('offer-3'),
    ];

    const action = loadOffers(testOffers);
    const result = offersReducer(initialState, action);

    expect(result.offers).toEqual(testOffers);
    expect(result.offers).toHaveLength(3);
    expect(result.offers[0].id).toBe('offer-1');
    expect(result.offers[1].title).toBe('Test Offer offer-2');
    expect(result.offers[2].isFavorite).toBe(false);
  });

  test('should handle setOffersDataLoadingStatus action', () => {
    // Test setting to true
    const actionTrue = setOffersDataLoadingStatus(true);
    let result = offersReducer(initialState, actionTrue);

    expect(result.isOffersDataLoading).toBe(true);
    expect(result.offers).toEqual([]);

    // Test setting back to false
    const actionFalse = setOffersDataLoadingStatus(false);
    result = offersReducer(result, actionFalse);

    expect(result.isOffersDataLoading).toBe(false);
  });

  test('should handle updateOfferFavoriteStatus action', () => {
    const testOffers = [
      createMockOffer('offer-1', false),
      createMockOffer('offer-2', true),
      createMockOffer('offer-3', false),
    ];

    // First load offers
    let state = offersReducer(initialState, loadOffers(testOffers));

    // Update favorite status of offer-1
    const action = updateOfferFavoriteStatus({ offerId: 'offer-1', isFavorite: true });
    state = offersReducer(state, action);

    expect(state.offers[0].isFavorite).toBe(true);
    expect(state.offers[1].isFavorite).toBe(true); // Was already true
    expect(state.offers[2].isFavorite).toBe(false); // Unchanged
  });

  test('should handle updateOfferFavoriteStatus to false', () => {
    const testOffers = [
      createMockOffer('offer-1', true),
      createMockOffer('offer-2', false),
    ];

    let state = offersReducer(initialState, loadOffers(testOffers));

    const action = updateOfferFavoriteStatus({ offerId: 'offer-1', isFavorite: false });
    state = offersReducer(state, action);

    expect(state.offers[0].isFavorite).toBe(false);
    expect(state.offers[1].isFavorite).toBe(false);
  });

  test('should not mutate state when loading offers', () => {
    const testOffers = [createMockOffer('offer-1')];
    const action = loadOffers(testOffers);
    const result = offersReducer(initialState, action);

    expect(result).not.toBe(initialState);
    expect(initialState.offers).toEqual([]);
    expect(result.offers).toEqual(testOffers);
  });

  test('should create correct action creators', () => {
    const testOffers = [createMockOffer('offer-1'), createMockOffer('offer-2')];

    const loadOffersAction = loadOffers(testOffers);
    const expectedLoadOffersAction = {
      type: 'offers/loadOffers',
      payload: testOffers,
    };

    const setLoadingAction = setOffersDataLoadingStatus(true);
    const expectedSetLoadingAction = {
      type: 'offers/setOffersDataLoadingStatus',
      payload: true,
    };

    const updateFavoriteAction = updateOfferFavoriteStatus({ offerId: 'test-id', isFavorite: true });
    const expectedUpdateFavoriteAction = {
      type: 'offers/updateOfferFavoriteStatus',
      payload: { offerId: 'test-id', isFavorite: true },
    };

    expect(loadOffersAction).toEqual(expectedLoadOffersAction);
    expect(loadOffersAction.type).toBe('offers/loadOffers');
    expect(loadOffersAction.payload).toBe(testOffers);

    expect(setLoadingAction).toEqual(expectedSetLoadingAction);
    expect(setLoadingAction.type).toBe('offers/setOffersDataLoadingStatus');
    expect(setLoadingAction.payload).toBe(true);

    expect(updateFavoriteAction).toEqual(expectedUpdateFavoriteAction);
    expect(updateFavoriteAction.type).toBe('offers/updateOfferFavoriteStatus');
    expect(updateFavoriteAction.payload.offerId).toBe('test-id');
    expect(updateFavoriteAction.payload.isFavorite).toBe(true);
  });

  test('should replace all offers when using loadOffers', () => {
    let state = offersReducer(initialState, loadOffers([createMockOffer('offer-1')]));
    state = offersReducer(state, loadOffers([createMockOffer('offer-2')]));

    expect(state.offers).toHaveLength(1);
    expect(state.offers[0].id).toBe('offer-2');
  });

  test('should handle empty offers array correctly', () => {
    const action = loadOffers([]);
    const result = offersReducer(initialState, action);

    expect(result.offers).toEqual([]);
    expect(result.offers).toHaveLength(0);
  });

  test('should maintain data immutability when updating offers', () => {
    const firstState = offersReducer(initialState, loadOffers([createMockOffer('offer-1')]));
    const secondState = offersReducer(firstState, loadOffers([createMockOffer('offer-2'), createMockOffer('offer-3')]));

    expect(firstState).not.toBe(secondState);
    expect(firstState.offers[0].id).toBe('offer-1');
    expect(secondState.offers[0].id).toBe('offer-2');
    expect(secondState.offers[1].id).toBe('offer-3');
  });

  test('should handle updateOfferFavoriteStatus when offer does not exist', () => {
    const testOffers = [createMockOffer('offer-1', false)];
    let state = offersReducer(initialState, loadOffers(testOffers));
    const action = updateOfferFavoriteStatus({ offerId: 'non-existent-id', isFavorite: true });
    state = offersReducer(state, action);
    expect(state.offers[0].isFavorite).toBe(false);
  });

  test('should preserve all offer properties when updating favorite status', () => {
    const originalOffer = createRandomOffer();
    const testOffers = [{ ...originalOffer, id: 'test-offer', isFavorite: false }];

    let state = offersReducer(initialState, loadOffers(testOffers));

    const action = updateOfferFavoriteStatus({ offerId: 'test-offer', isFavorite: true });
    state = offersReducer(state, action);

    const updatedOffer = state.offers[0];
    expect(updatedOffer.isFavorite).toBe(true);
    expect(updatedOffer.title).toBe(originalOffer.title);
    expect(updatedOffer.price).toBe(originalOffer.price);
    expect(updatedOffer.type).toBe(originalOffer.type);
    expect(updatedOffer.city).toEqual(originalOffer.city);
    expect(updatedOffer.previewImage).toBe(originalOffer.previewImage);
  });

  test('should maintain loading state when offers are loaded', () => {
    const testOffers = [createMockOffer('offer-1')];
    let state = offersReducer(initialState, setOffersDataLoadingStatus(true));
    expect(state.isOffersDataLoading).toBe(true);
    state = offersReducer(state, loadOffers(testOffers));
    expect(state.offers).toEqual(testOffers);
    expect(state.isOffersDataLoading).toBe(true);
  });

  test('should handle multiple updates to favorite status', () => {
    const testOffers = [
      createMockOffer('offer-1', false),
      createMockOffer('offer-2', false),
      createMockOffer('offer-3', true),
    ];

    let state = offersReducer(initialState, loadOffers(testOffers));

    state = offersReducer(state, updateOfferFavoriteStatus({ offerId: 'offer-1', isFavorite: true }));
    state = offersReducer(state, updateOfferFavoriteStatus({ offerId: 'offer-3', isFavorite: false }));

    expect(state.offers[0].isFavorite).toBe(true);
    expect(state.offers[1].isFavorite).toBe(false);
    expect(state.offers[2].isFavorite).toBe(false);
  });
});
