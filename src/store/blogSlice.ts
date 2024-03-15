import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Articles = {
  slug: string,
  title: string,
  description: string,
  body: string,
  tags: string[],
  createdAt: string,
  updatedAt: string,
  favorited: boolean,
  favoritesCount: number,
  author: {
    username: string,
    bio: string,
    image: string,
    following: boolean,
  },
};

type State = {
  page: number,
  articles: Articles[],
};

const initialState: State = {
  page: 1,
  articles: [],
};

export const getArticles = createAsyncThunk<Articles[], undefined, { rejectValue: string }>(
  "getArticles",
  async function (what, { rejectWithValue }) {
    const response = await fetch("https://blog.kata.academy/api/articles");
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      rejectWithValue("error");
    }
  }
);

const blogReducer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    handlerPagination(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticles.fulfilled, (state, action: PayloadAction<Articles[]>) => {
      state.articles = action.payload;
    });
  },
});

export const { handlerPagination } = blogReducer.actions;

export default blogReducer.reducer;
