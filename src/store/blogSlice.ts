import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";

import { Request } from "../hooks/hooks.ts";

import type {
  State,
  PropsGetArticles,
  ReturnGetArticles,
  PropsGetArticle,
  ReturnGetArticle,
  ReturnRegisterUser,
  PropsRegisterUser,
  ReturnLoginUser,
  PropsLoginUser,
  PropsUpdateUser,
  PropsRequestUpdateUser,
  PropsNewArticle,
  ReturnNewArticle,
  PropsDeleteArticle,
  PropsUpdateArticle,
  PropsRequestUpdateArticle,
  PropsFavoritedArticle,
} from "./typesSlice.ts";

// ------------------------------------------- fetch

export const getArticles = createAsyncThunk<ReturnGetArticles, PropsGetArticles, { rejectValue: string }>(
  "getArticles",
  async function (data, { rejectWithValue }) {
    const result = await Request<ReturnGetArticles, unknown>("GET", `https://blog.kata.academy/api/articles?offset=${(data.page - 1) * 20}`, {
      token: data.token,
    });
    return typeof result === "string" ? rejectWithValue(result) : result;
  }
);

export const getArticle = createAsyncThunk<ReturnGetArticle, PropsGetArticle, { rejectValue: string }>(
  "getArticle",
  async function (data, { rejectWithValue }) {
    const result = await Request<ReturnGetArticle, unknown>("GET", `https://blog.kata.academy/api/articles/${data.slug}`, { token: data.token });
    return typeof result === "string" ? rejectWithValue(result) : result;
  }
);

export const registerUser = createAsyncThunk<ReturnRegisterUser, PropsRegisterUser, { rejectValue: string }>(
  "registerUser",
  async function (user, { rejectWithValue }) {
    const result = await Request<ReturnRegisterUser, PropsRegisterUser>("POST", "https://blog.kata.academy/api/users", { json: true }, user);
    if (typeof result === "string" && result === "422") {
      alert("Username or email is already taken");
      return rejectWithValue("");
    } else if (typeof result === "string") {
      alert(result);
      return rejectWithValue("");
    }
    document.cookie = `token=${result.user.token}; path=/; samesite; max-age=2592000`;
    return result;
  }
);

export const loginUser = createAsyncThunk<ReturnLoginUser, PropsLoginUser, { rejectValue: string }>(
  "loginUser",
  async function (user, { rejectWithValue }) {
    const result = await Request<ReturnLoginUser, PropsLoginUser>("POST", "https://blog.kata.academy/api/users/login", { json: true }, user);
    if (typeof result === "string" && result === "422") {
      alert("Invalid username or password");
      return rejectWithValue("");
    } else if (typeof result === "string") {
      alert(result);
      return rejectWithValue("");
    }
    document.cookie = `token=${result.user.token}; path=/; samesite; max-age=2592000`;
    return result;
  }
);

export const getUser = createAsyncThunk<ReturnLoginUser, string, { rejectValue: string }>("getUser", async function (token, { rejectWithValue }) {
  const result = await Request<ReturnLoginUser, string>("GET", "https://blog.kata.academy/api/user", { token: token });
  if (typeof result === "string") {
    document.cookie = "token=null; max-age=0";
    return rejectWithValue("");
  }
  document.cookie = `token=${result.user.token}; path=/; samesite; max-age=2592000`;
  return result;
});

export const updateUser = createAsyncThunk<ReturnLoginUser, PropsUpdateUser, { rejectValue: string, get: State }>(
  "updateUser",
  async function (data, { rejectWithValue }) {
    const result = await Request<ReturnLoginUser, PropsRequestUpdateUser>(
      "PUT",
      "https://blog.kata.academy/api/user",
      { json: true, token: data.token },
      { user: data.user }
    );
    if (typeof result === "string" && result === "422") {
      alert("Username or email is already taken");
      return rejectWithValue("");
    } else if (typeof result === "string") {
      alert(result);
      return rejectWithValue("");
    }
    document.cookie = `token=${result.user.token}; path=/; samesite; max-age=2592000`;
    return result;
  }
);

export const newArticle = createAsyncThunk<ReturnNewArticle, PropsNewArticle, { rejectValue: string }>(
  "newArticle",
  async function (data, { rejectWithValue }) {
    const result = await Request<ReturnNewArticle, PropsNewArticle>(
      "POST",
      "https://blog.kata.academy/api/articles",
      { json: true, token: data.token },
      { article: data.article }
    );
    if (typeof result === "string") {
      alert(result);
      return rejectWithValue("");
    }
    return result;
  }
);

export const deleteArticle = createAsyncThunk<unknown, PropsDeleteArticle, { rejectValue: string }>(
  "deleteArticle",
  async function (data, { rejectWithValue }) {
    const result = await Request<unknown, PropsDeleteArticle>("DELETE", `https://blog.kata.academy/api/articles/${data.slug}`, { token: data.token });
    if (typeof result === "string") {
      alert(result);
      return rejectWithValue("");
    }
    return result;
  }
);

export const updateArticle = createAsyncThunk<ReturnNewArticle, PropsUpdateArticle, { rejectValue: string }>(
  "updateArticle",
  async function (data, { rejectWithValue }) {
    const result = await Request<ReturnNewArticle, PropsRequestUpdateArticle>(
      "PUT",
      `https://blog.kata.academy/api/articles/${data.slug}`,
      {
        json: true,
        token: data.token,
      },
      { article: data.article }
    );
    if (typeof result === "string") {
      alert(result);
      return rejectWithValue("");
    }
    return result;
  }
);

export const favoritedArticle = createAsyncThunk<ReturnNewArticle, PropsFavoritedArticle, { rejectValue: string }>(
  "favirutedArticle",
  async function (data, { rejectWithValue }) {
    const result = await Request<string, ReturnNewArticle>(
      data.favorited ? "DELETE" : "POST",
      `https://blog.kata.academy/api/articles/${data.slug}/favorite`,
      {
        token: data.token,
      }
    );
    if (typeof result === "string") {
      alert(result);
      return rejectWithValue("");
    }
    return result;
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
    builder.addCase(getArticles.fulfilled, (state, action: PayloadAction<ReturnGetArticles>) => {
      state.loading = false;
      state.articles.articles = action.payload.articles;
    });
    builder.addCase(getArticle.fulfilled, (state, action: PayloadAction<ReturnGetArticle>) => {
      state.loading = false;
      state.articles.article = action.payload.article;
    });
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<ReturnRegisterUser>) => {
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<ReturnLoginUser>) => {
      state.user = action.payload.user;
    });
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<ReturnLoginUser>) => {
      state.user = action.payload.user;
    });
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<ReturnLoginUser>) => {
      state.user = action.payload.user;
    });
    builder.addCase(newArticle.fulfilled, (state, action: PayloadAction<ReturnNewArticle>) => {
      state.articles.article = action.payload.article;
    });
    builder.addCase(updateArticle.fulfilled, (state, action: PayloadAction<ReturnNewArticle>) => {
      console.log(action.payload);
      state.articles.article = action.payload.article;
    });

    builder.addMatcher(isAnyOf(getArticles.pending, getArticle.pending, registerUser.pending, loginUser.pending), (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addMatcher(
      isAnyOf(
        getArticles.rejected,
        getArticle.rejected,
        registerUser.rejected,
        loginUser.rejected,
        getUser.rejected,
        updateUser.rejected,
        newArticle.rejected,
        updateArticle.rejected
      ),
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { handlerPagination, handlerLogOut } = blogReducer.actions;

export default blogReducer.reducer;
