import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue, dispatch }) => {
    const result = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    dispatch(setPosts(result.data));
  }
);

export const removePostById = createAsyncThunk(
  'posts/removePostById',
  async (id, { rejectWithValue, dispatch }) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    dispatch(removePost(id));
  }
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  //deprecated:
  // extraReducers: {
  //   [getPosts.fulfilled]: () => console.log('fulfilled'),
  //   [getPosts.pending]: () => console.log('pending'),
  //   [getPosts.rejected]: () => console.log('rejected'),
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, () => {
        console.log('get fulfilled');
      })
      .addCase(getPosts.pending, () => {
        console.log('get pending');
      })
      .addCase(getPosts.rejected, () => {
        console.log('get rejected');
      })
      .addCase(removePostById.fulfilled, () => {
        console.log(' remove fulfilled');
      })
      .addCase(removePostById.pending, () => {
        console.log('remove pending');
      })
      .addCase(removePostById.rejected, () => {
        console.log('remove rejected');
      });
  },
});

export const { setPosts, removePost } = postSlice.actions;
export default postSlice.reducer;
