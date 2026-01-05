import detailedOfferReducer, { setDetailedOffer, setNearbyOffers, updateDetailedOfferFavorite } from './detailed-offer-slice';
import { OfferType, OfferCardType } from '../../types/offer';
import { createRandomDetailedOffer } from '../../utils/create-random-detailed-offer';
import { createRandomOffer } from '../../utils/create-random-offer';

describe('Detailed Offer Reducer', () => {
  const initialState = {
    offer: undefined,
    nearbyOffers: [],
  };

  const createMockOffer = (overrides?: Partial<OfferType>): OfferType => {
    const offer = createRandomDetailedOffer();
    return {
      ...offer,
      id: 'test-offer-1',
      isFavorite: false,
      ...overrides,
    };
  };

  const createMockNearbyOffer = (id: string, isFavorite = false): OfferCardType => {
    const offer = createRandomOffer();
    return {
      ...offer,
      id,
      title: `Nearby Offer ${id}`,
      isFavorite,
    };
  };

  test('should return initial state with default reducer', () => {
    const result = detailedOfferReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  test('should handle setDetailedOffer action', () => {
    const testOffer = createMockOffer();

    const action = setDetailedOffer(testOffer);
    const result = detailedOfferReducer(initialState, action);

    expect(result.offer).toEqual(testOffer);
    expect(result.offer?.id).toBe('test-offer-1');
    expect(result.offer?.isFavorite).toBe(false);
  });

  test('should handle setDetailedOffer with undefined', () => {
    const action = setDetailedOffer(undefined);
    const result = detailedOfferReducer(initialState, action);

    expect(result.offer).toBeUndefined();
  });

  test('should handle setNearbyOffers action', () => {
    const testNearbyOffers = [
      createMockNearbyOffer('nearby-1'),
      createMockNearbyOffer('nearby-2'),
    ];

    const action = setNearbyOffers(testNearbyOffers);
    const result = detailedOfferReducer(initialState, action);

    expect(result.nearbyOffers).toEqual(testNearbyOffers);
    expect(result.nearbyOffers).toHaveLength(2);
    expect(result.nearbyOffers[0].id).toBe('nearby-1');
    expect(result.nearbyOffers[1].id).toBe('nearby-2');
  });

  test('should handle updateDetailedOfferFavorite for main offer', () => {
    const testOffer = createMockOffer({ isFavorite: false });
    let state = { ...initialState, offer: testOffer } as { offer: OfferType; nearbyOffers: OfferCardType[] };

    const action = updateDetailedOfferFavorite({ offerId: 'test-offer-1', isFavorite: true });
    state = detailedOfferReducer(state, action) as { offer: OfferType; nearbyOffers: OfferCardType[] };

    expect(state.offer?.isFavorite).toBe(true);
  });


  test('should update both main offer and nearby offer with same id', () => {
    const testOffer = createMockOffer({ isFavorite: false });
    const testNearbyOffers = [
      createMockNearbyOffer('test-offer-1', false),
      createMockNearbyOffer('nearby-2', false),
    ];
    let state = {
      offer: testOffer,
      nearbyOffers: testNearbyOffers,
    } as { offer: OfferType; nearbyOffers: OfferCardType[] };

    const action = updateDetailedOfferFavorite({ offerId: 'test-offer-1', isFavorite: true });
    state = detailedOfferReducer(state, action) as { offer: OfferType; nearbyOffers: OfferCardType[] };

    expect(state.offer?.isFavorite).toBe(true);
    expect(state.nearbyOffers[0].isFavorite).toBe(true);
    expect(state.nearbyOffers[1].isFavorite).toBe(false);
  });

  test('should not mutate state when setting detailed offer', () => {
    const testOffer = createMockOffer();
    const action = setDetailedOffer(testOffer);
    const result = detailedOfferReducer(initialState, action);

    expect(result).not.toBe(initialState);
    expect(initialState.offer).toBeUndefined();
    expect(result.offer).toEqual(testOffer);
  });

  test('should create correct action creators', () => {
    const testOffer = createMockOffer();
    const testNearbyOffers = [createMockNearbyOffer('nearby-1')];

    const setOfferAction = setDetailedOffer(testOffer);
    const expectedSetOfferAction = {
      type: 'detailedOffer/setDetailedOffer',
      payload: testOffer,
    };

    const setNearbyAction = setNearbyOffers(testNearbyOffers);
    const expectedSetNearbyAction = {
      type: 'detailedOffer/setNearbyOffers',
      payload: testNearbyOffers,
    };

    const updateFavoriteAction = updateDetailedOfferFavorite({ offerId: 'test-id', isFavorite: true });
    const expectedUpdateFavoriteAction = {
      type: 'detailedOffer/updateDetailedOfferFavorite',
      payload: { offerId: 'test-id', isFavorite: true },
    };

    expect(setOfferAction).toEqual(expectedSetOfferAction);
    expect(setOfferAction.type).toBe('detailedOffer/setDetailedOffer');
    expect(setOfferAction.payload).toBe(testOffer);

    expect(setNearbyAction).toEqual(expectedSetNearbyAction);
    expect(setNearbyAction.type).toBe('detailedOffer/setNearbyOffers');
    expect(setNearbyAction.payload).toBe(testNearbyOffers);

    expect(updateFavoriteAction).toEqual(expectedUpdateFavoriteAction);
    expect(updateFavoriteAction.type).toBe('detailedOffer/updateDetailedOfferFavorite');
    expect(updateFavoriteAction.payload.offerId).toBe('test-id');
    expect(updateFavoriteAction.payload.isFavorite).toBe(true);
  });

  test('should handle setting empty nearby offers', () => {
    const action = setNearbyOffers([]);
    const result = detailedOfferReducer(initialState, action);

    expect(result.nearbyOffers).toEqual([]);
    expect(result.nearbyOffers).toHaveLength(0);
  });

  test('should maintain data immutability when updating', () => {
    const testOffer = createMockOffer({ isFavorite: false });
    const testNearbyOffers = [createMockNearbyOffer('nearby-1', false)];
    const state = {
      offer: testOffer,
      nearbyOffers: testNearbyOffers,
    } as { offer: OfferType; nearbyOffers: OfferCardType[] };

    const firstState = detailedOfferReducer(state, setNearbyOffers([...testNearbyOffers, createMockNearbyOffer('nearby-2')])) as { offer: OfferType; nearbyOffers: OfferCardType[] };
    const secondState = detailedOfferReducer(firstState, updateDetailedOfferFavorite({ offerId: 'test-offer-1', isFavorite: true })) as { offer: OfferType; nearbyOffers: OfferCardType[] };

    expect(firstState).not.toBe(state);
    expect(secondState).not.toBe(firstState);
    expect(state.offer?.isFavorite).toBe(false);
    expect(secondState.offer?.isFavorite).toBe(true);
  });

  test('should handle offer with all properties from createRandomDetailedOffer', () => {
    const fullOffer = createRandomDetailedOffer();

    const action = setDetailedOffer(fullOffer);
    const result = detailedOfferReducer(initialState, action);

    expect(result.offer).toBeDefined();
    expect(result.offer?.description).toBeDefined();
    expect(result.offer?.bedrooms).toBeDefined();
    expect(result.offer?.goods).toBeDefined();
    expect(result.offer?.host).toBeDefined();
    expect(result.offer?.images).toBeDefined();
    expect(result.offer?.maxAdults).toBeDefined();
  });

  test('should not update when offerId does not match', () => {
    const testOffer = createMockOffer({ isFavorite: false });
    const testNearbyOffers = [createMockNearbyOffer('nearby-1', false)];
    let state = {
      offer: testOffer,
      nearbyOffers: testNearbyOffers,
    } as { offer: OfferType; nearbyOffers: OfferCardType[] };

    const action = updateDetailedOfferFavorite({ offerId: 'non-existent-id', isFavorite: true });
    state = detailedOfferReducer(state, action) as { offer: OfferType; nearbyOffers: OfferCardType[] };

    expect(state.offer?.isFavorite).toBe(false);
    expect(state.nearbyOffers[0].isFavorite).toBe(false);
  });

  test('should preserve all offer properties when updating favorite status', () => {
    const originalOffer = createRandomDetailedOffer();
    let state = {
      offer: originalOffer,
      nearbyOffers: [],
    } as { offer: OfferType; nearbyOffers: OfferCardType[] };

    const action = updateDetailedOfferFavorite({ offerId: originalOffer.id, isFavorite: true });
    state = detailedOfferReducer(state, action) as { offer: OfferType; nearbyOffers: OfferCardType[] };

    expect(state.offer?.isFavorite).toBe(true);
    expect(state.offer?.description).toBe(originalOffer.description);
    expect(state.offer?.bedrooms).toBe(originalOffer.bedrooms);
    expect(state.offer?.goods).toEqual(originalOffer.goods);
    expect(state.offer?.host).toEqual(originalOffer.host);
  });
});
