import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewType } from '../../types/review';

type CommentsState = {
  comments: ReviewType[];
};

const initialState: CommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<ReviewType[]>) {
      state.comments = action.payload;
    },
    addComment(state, action: PayloadAction<ReviewType>) {
      state.comments.push(action.payload);
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
