import React from "react";
import { Routes, Route } from "react-router-dom";

import { useAppDispatch } from "../hooks/hooks";
import { getUser } from "../store/blogSlice";
import Layout from "../layout";
import ArticleListPage from "../pages/ArticleListPage";
import ArticlePage from "../pages/ArticlePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import EditProfilePage from "../pages/EditProfilePage";
import NewArticlePage from "../pages/NewArticlePage";
import NotFoundPage from "../pages/NotFoundPage";

import "../assets/fonts/index.css";

const App: React.FC = () => {
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
