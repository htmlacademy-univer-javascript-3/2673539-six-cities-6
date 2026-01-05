import commentsReducer, { setComments, addComment } from './comments-slice';
import { ReviewType } from '../../types/review';

describe('Comments Reducer', () => {
  const initialState = {
    comments: [],
  };

  const mockReview1: ReviewType = {
    id: '1',
    date: '2023-10-15T14:30:00.000Z',
    user: {
      name: 'John Doe',
      avatarUrl: 'path/to/avatar1.jpg',
      isPro: true,
    },
    comment: 'Great place! Would definitely stay again.',
    rating: 5,
  };

  const mockReview2: ReviewType = {
    id: '2',
    date: '2023-10-14T10:15:00.000Z',
    user: {
      name: 'Jane Smith',
      avatarUrl: 'path/to/avatar2.jpg',
      isPro: false,
    },
    comment: 'Nice location but a bit noisy.',
    rating: 4,
  };

  const mockReview3: ReviewType = {
    id: '3',
    date: '2023-10-16T09:45:00.000Z',
    user: {
      name: 'Bob Johnson',
      avatarUrl: 'path/to/avatar3.jpg',
      isPro: true,
    },
    comment: 'Excellent service and facilities.',
    rating: 5,
  };

  test('should return initial state with default reducer', () => {
    const result = commentsReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  test('should handle setComments action', () => {
    const testComments = [mockReview1, mockReview2];

    const action = setComments(testComments);
    const result = commentsReducer(initialState, action);

    expect(result.comments).toEqual(testComments);
    expect(result.comments).toHaveLength(2);
    expect(result.comments[0].id).toBe('1');
    expect(result.comments[1].user.name).toBe('Jane Smith');
  });

  test('should handle addComment action', () => {
    const action = addComment(mockReview1);
    const result = commentsReducer(initialState, action);

    expect(result.comments).toEqual([mockReview1]);
    expect(result.comments).toHaveLength(1);
    expect(result.comments[0].comment).toBe('Great place! Would definitely stay again.');
    expect(result.comments[0].rating).toBe(5);
  });

  test('should not mutate state when setting comments', () => {
    const testComments = [mockReview1];
    const action = setComments(testComments);
    const result = commentsReducer(initialState, action);

    expect(result).not.toBe(initialState);
    expect(initialState.comments).toEqual([]);
    expect(result.comments).toEqual(testComments);
  });

  test('should create correct action creators', () => {
    const testComments = [mockReview1, mockReview2];

    const setCommentsAction = setComments(testComments);
    const expectedSetCommentsAction = {
      type: 'comments/setComments',
      payload: testComments,
    };

    const addCommentAction = addComment(mockReview3);
    const expectedAddCommentAction = {
      type: 'comments/addComment',
      payload: mockReview3,
    };

    expect(setCommentsAction).toEqual(expectedSetCommentsAction);
    expect(setCommentsAction.type).toBe('comments/setComments');
    expect(setCommentsAction.payload).toBe(testComments);

    expect(addCommentAction).toEqual(expectedAddCommentAction);
    expect(addCommentAction.type).toBe('comments/addComment');
    expect(addCommentAction.payload).toBe(mockReview3);
  });


  test('should replace all comments when using setComments', () => {
    let state = commentsReducer(initialState, addComment(mockReview1));
    state = commentsReducer(state, addComment(mockReview2));

    const newComments = [mockReview3];
    state = commentsReducer(state, setComments(newComments));

    expect(state.comments).toEqual([mockReview3]);
    expect(state.comments).toHaveLength(1);
    expect(state.comments[0].id).toBe('3');
  });

  test('should handle empty arrays correctly', () => {
    // Test setting empty array
    const action = setComments([]);
    const result = commentsReducer(initialState, action);

    expect(result.comments).toEqual([]);
    expect(result.comments).toHaveLength(0);
  });

  test('should maintain data immutability when adding comments', () => {
    const firstState = commentsReducer(initialState, addComment(mockReview1));
    const secondState = commentsReducer(firstState, addComment(mockReview2));

    expect(firstState.comments).not.toBe(secondState.comments);
    expect(firstState.comments[0]).toBe(mockReview1);
    expect(secondState.comments[0]).toBe(mockReview1);
    expect(secondState.comments[1]).toBe(mockReview2);
  });

  test('should handle comments with various properties', () => {
    const reviewWithSpecialCharacters: ReviewType = {
      id: '4',
      date: '2023-10-17T12:00:00.000Z',
      user: {
        name: 'Test User <with> &special "chars"',
        avatarUrl: '',
        isPro: false,
      },
      comment: 'Comment with\nnew line and\ttab character',
      rating: 3,
    };

    const action = addComment(reviewWithSpecialCharacters);
    const result = commentsReducer(initialState, action);

    expect(result.comments[0].user.name).toBe('Test User <with> &special "chars"');
    expect(result.comments[0].comment).toBe('Comment with\nnew line and\ttab character');
    expect(result.comments[0].rating).toBe(3);
  });
});
