import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type {
  State,
  ReturnGetArticles,
  ReturnGetArticle,
  ReturnRegisterUser,
  PropsRegisterUser,
  ReturnLoginUser,
  PropsLoginUser,
  PropsUpdateUser,
  PropsNewArticle,
  ReturnNewArticle,
  PropsDeleteArticle,
} from "../types/typesSlice";

// ------------------------------------------- fetch

export const getArticles = createAsyncThunk<ReturnGetArticles, number, { rejectValue: string }>(
  "getArticles",
  async function (page, { rejectWithValue }) {
    const url = `https://blog.kata.academy/api/articles?offset=${(page - 1) * 20}`;
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return rejectWithValue("Error, please repeat later");
    }
  }
);

export const getArticle = createAsyncThunk<ReturnGetArticle, string, { rejectValue: string }>(
  "getArticle",
  async function (slug, { rejectWithValue }) {
    const url = `https://blog.kata.academy/api/articles/${slug}`;
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return rejectWithValue("Not Found");
    }
  }
);

export const registerUser = createAsyncThunk<ReturnRegisterUser, PropsRegisterUser, { rejectValue: string }>(
  "registerUser",
  async function (user, { rejectWithValue }) {
    const url = "https://blog.kata.academy/api/users";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      document.cookie = `token=${result.user.token}; path=/; samesite; max-age=2592000`;
      return result;
    } else if (response.status === 422) {
      alert(`${Object.keys(result.errors).join(" and ")} is already taken`);
      return rejectWithValue("");
    } else {
      alert("Error, please repeat later");
      return rejectWithValue("");
    }
  }
);

export const loginUser = createAsyncThunk<ReturnLoginUser, PropsLoginUser, { rejectValue: string }>(
  "loginUser",
  async function (user, { rejectWithValue }) {
    const url = "https://blog.kata.academy/api/users/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
      alert("Error, please repeat later");
      return rejectWithValue("");
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
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      document.cookie = "token=null; max-age=0";
      rejectWithValue("");
    }
  }
);

export const updateUser = createAsyncThunk<ReturnLoginUser, PropsUpdateUser, { rejectValue: string }>(
  "updateUser",
  async function (data, { rejectWithValue }) {
    const url = "https://blog.kata.academy/api/user";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${data.token}`,
      },
      body: JSON.stringify({ user: data.user }),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else if (response.status === 422) {
      alert(`${Object.keys(result.errors).join(" and ")} is already taken`);
      rejectWithValue("");
    } else {
      alert("Error, please repeat later");
      rejectWithValue("");
    }
  }
);

export const newArticle = createAsyncThunk<ReturnNewArticle, PropsNewArticle, { rejectValue: string }>(
  "newArticle",
  async function (data, { rejectWithValue }) {
    const url = "https://blog.kata.academy/api/articles";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${data.token}`,
      },
      body: JSON.stringify({ article: data.article }),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      alert("Error, please repeat later");
      rejectWithValue("");
    }
  }
);

export const deleteArticle = createAsyncThunk<unknown, PropsDeleteArticle, { rejectValue: string }>(
  "deleteArticle",
  async function (data, { rejectWithValue }) {
    const url = `https://blog.kata.academy/api/articles/${data.slug}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Token ${data.token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      rejectWithValue("5656");
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
    builder.addCase(newArticle.fulfilled, (state, action: PayloadAction<ReturnNewArticle>) => {
      state.articles.article = action.payload.article;
    });
    builder.addCase(newArticle.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    });
  },
});

export const { handlerPagination, handlerLogOut } = blogReducer.actions;

export default blogReducer.reducer;
