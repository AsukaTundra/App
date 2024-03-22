import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type {
  State,
  ArticleType,
  ReturnGetArticles,
  ReturnGetArticle,
  ReturnRegisterUser,
  PropsRegisterUser,
  ReturnLoginUser,
  PropsLoginUser,
  PropsUpdateUser,
  NewArticleProps,
} from "../types/types";

// ------------------------------------------- fetch

export const getArticles = createAsyncThunk<ReturnGetArticles, undefined, { rejectValue: string }>(
  "getArticles",
  async function (_, { rejectWithValue }) {
    const url = "https://blog.kata.academy/api/articles";
    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      return rejectWithValue(result.errors.message);
    }
  }
);

export const getArticle = createAsyncThunk<ReturnGetArticle, string, { rejectValue: string }>(
  "getArticle",
  async function (slug, { rejectWithValue }) {
    const url = `https://blog.kata.academy/api/articles/${slug}`;
    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      return rejectWithValue(result);
    }
  }
);

export const registerUser = createAsyncThunk<ReturnRegisterUser, PropsRegisterUser, { rejectValue: string }>(
  "registerUser",
  async function (user, { rejectWithValue }) {
    const { username, email, password } = user;
    const url = "https://blog.kata.academy/api/users";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"user":{"username":"${username}","email":"${email}","password":"${password}"}}`,
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      document.cookie = `token=${result.user.token}; path=/; samesite; max-age=2592000`;
      return result;
    }
    if (response.status === 422) {
      alert(`${Object.keys(result.errors)} is already taken`);
      return rejectWithValue("");
    } else {
      return rejectWithValue(result.errors.message);
    }
  }
);

export const loginUser = createAsyncThunk<ReturnLoginUser, PropsLoginUser, { rejectValue: string }>(
  "loginUser",
  async function (user, { rejectWithValue }) {
    const { email, password } = user;
    const url = "https://blog.kata.academy/api/users/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"user":{"email":"${email}","password":"${password}"}}`,
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      document.cookie = `token=${result.user.token}; path=/; samesite; max-age=2592000`;
      return result;
    } else if (response.status === 422) {
      alert("Invalid username or password");
      return rejectWithValue("");
    } else {
      return rejectWithValue(result.errors.message);
    }
  }
);

export const getUser = createAsyncThunk<ReturnLoginUser, string, { rejectValue: string }>(
  "getUser",
  async function (token, { rejectWithValue }) {
    const url = "https://blog.kata.academy/api/user";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      document.cookie = "token=null; max-age=0";
      rejectWithValue("");
    }
  }
);

export const updateUser = createAsyncThunk<ReturnLoginUser, PropsUpdateUser, { rejectValue: string }>(
  "updateUser",
  async function (user, { rejectWithValue }) {
    const { username, email, password, image, token } = user.user;
    const url = "https://blog.kata.academy/api/user";
    const body = image
      ? `{"user":{"username":"${username}","email":"${email}","password":"${password}","image":"${image}"}}`
      : `{"user":{"username":"${username}","email":"${email}","password":"${password}"}}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: body,
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else if (response.status === 422) {
      alert(`${Object.keys(result.errors)} is already taken`);
      rejectWithValue("");
    } else {
      rejectWithValue("");
    }
  }
);

export const newArticle = createAsyncThunk<ArticleType, { data: NewArticleProps, token: string }, { rejectValue: string }>(
  "newArticle",
  async function (article, { rejectWithValue }) {
    const url = "https://blog.kata.academy/api/articles";
    const body = JSON.stringify(article.data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${article.token}`,
      },
      body: body,
    };
    console.log(body);
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      rejectWithValue("");
    }
  }
);

// ------------------------------------------- reducer

const initialState: State = {
  error: "",
  loading: false,
  articles: {
    page: 1,
    article: null,
    articles: [],
  },
  user: {
    email: "",
    token: "",
    username: "",
  },
};

const blogReducer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    handlerPagination(state, action: PayloadAction<number>) {
      state.articles.page = action.payload;
    },
    handlerLogOut(state) {
      state.user = { email: "", token: "", username: "" };
    },
  },
  extraReducers: (builder) => {
    // getArticles
    builder.addCase(getArticles.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getArticles.fulfilled, (state, action: PayloadAction<ReturnGetArticles>) => {
      state.loading = false;
      state.articles.articles = action.payload.articles;
    });
    builder.addCase(getArticles.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload;
    });
    // getArticle
    builder.addCase(getArticle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getArticle.fulfilled, (state, action: PayloadAction<ReturnGetArticle>) => {
      state.loading = false;
      state.articles.article = action.payload.article;
    });
    builder.addCase(getArticle.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload;
    });
    // registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<ReturnRegisterUser>) => {
      state.user = action.payload.user;
    });
    builder.addCase(registerUser.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload;
    });
    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<ReturnLoginUser>) => {
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload;
    });
    // getUser
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<ReturnLoginUser>) => {
      state.user = action.payload.user;
    });
    builder.addCase(getUser.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    });
    // updateUser
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<ReturnLoginUser>) => {
      state.user = action.payload.user;
    });
    builder.addCase(updateUser.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    });
    // newArticle
    builder.addCase(newArticle.fulfilled, (state, action: PayloadAction<ArticleType>) => {
      state.articles.article = action.payload;
    });
    builder.addCase(newArticle.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    });
  },
});

export const { handlerPagination, handlerLogOut } = blogReducer.actions;

export default blogReducer.reducer;
