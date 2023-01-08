import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  count: 0,
});

// CRUD operations with Thunk
const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);

  return response.data;
});

const addNewPost = createAsyncThunk("posts/addNewPost", async (initialPost) => {
  const response = await axios.post(POSTS_URL, initialPost);

  return response.data;
});

const updatePost = createAsyncThunk("posts/updatePost", async (initialPost) => {
  const { postId } = initialPost;

  try {
    const response = await axios.put(`${POSTS_URL}/${postId}`, initialPost);
    return response.data;
  } catch (err) {
    console.log("Post not existing on server");
    console.log(err);
    return initialPost;
  }
});

const deletePost = createAsyncThunk("posts/deletePost", async (initialPost) => {
  const { postId } = initialPost;

  const response = await axios.delete(`${POSTS_URL}/${postId}`);
  if (response?.status === 200) return initialPost;

  return `${response?.status} : ${response?.statusText}`;
});

// Slices
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (!existingPost) return new Error(`No post found with ID: ${postId}`);

      existingPost.reactions[reaction]++;
    },
    // increaseCount: (state, action) => {
    //     state.count = state.count + 1
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let minutes = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: minutes++ }).toISOString();

          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };

          return post;
        });

        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.data = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };

        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.postId) {
          console.log("Update could not be completed");
          console.log(action.payload);
          return;
        }

        const { postId } = action.payload;
        action.payload.id = Number(postId);
        action.payload.date = new Date().toISOString();

        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not be completed");
          console.log(action.payload);
          return;
        }

        postsAdapter.removeOne(state, action.payload.id);
      });
  },
});

// Selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

const selectPostsStatus = (state) => state.posts.status;
const selectPostsError = (state) => state.posts.error;
const selectUserById = (state, userId) =>
  state.users.find((user) => Number(user.id) === Number(userId));
// const selectCount = (state) => state.posts.count

const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export {
  selectPostsStatus,
  selectPostsError,
  selectUserById,
  // selectCount,
  selectPostsByUser,
};

export { fetchPosts, addNewPost, updatePost, deletePost };

export const { addReaction, increaseCount } = postsSlice.actions;

export default postsSlice.reducer;
