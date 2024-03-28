import React from "react";
import { Routes, Route } from "react-router-dom";

import { useAppDispatch } from "../hooks/hooks.ts";
import { getUser } from "../store/blogSlice.ts";
import Layout from "../layout";
import ArticleListPage from "../pages/articleListPage";
import ArticlePage from "../pages/articlePage";
import SignUpPage from "../pages/signUpPage";
import SignInPage from "../pages/signInPage";
import EditProfilePage from "../pages/editProfilePage";
import NewArticlePage from "../pages/newArticlePage";
import ArticleEditPage from "../pages/articleEditPage";
import NotFoundPage from "../pages/notFoundPage";

import "../assets/fonts/index.css";
import "./app.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  if (document.cookie) {
    dispatch(getUser(document.cookie.split("=")[1]));
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ArticleListPage />} />
          <Route path="article/:slug" element={<ArticlePage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="edit-profile" element={<EditProfilePage />} />
          <Route path="new-article" element={<NewArticlePage />} />
          <Route path="articles/:slug/edit" element={<ArticleEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};
