import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { ArticleType, RequestGetArticles, RequestGetArticle } from "../types";

type State = {
  page: number,
  articles: ArticleType[],
  article: ArticleType | null,
};

const initialState: State = {
  page: 1,
  articles: [],
  article: null,
};

export const getArticles = createAsyncThunk<RequestGetArticles, undefined, { rejectValue: string }>(
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

export const getArticle = createAsyncThunk<RequestGetArticle, string, { rejectValue: string }>(
  "getArticle",
  async function (slug, { rejectWithValue }) {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
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
    builder.addCase(getArticles.fulfilled, (state, action: PayloadAction<RequestGetArticles>) => {
      state.articles = action.payload.articles;
    });
    builder.addCase(getArticle.fulfilled, (state, action: PayloadAction<RequestGetArticle>) => {
      state.article = action.payload.article;
    });
  },
});

export const { handlerPagination } = blogReducer.actions;

export default blogReducer.reducer;
