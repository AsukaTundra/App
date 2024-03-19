import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../layout";
import List from "../pages/list";
import ArticlePage from "../pages/article";
import SignUp from "../pages/signUp";
import SignIn from "../pages/signIn";

import "../assets/fonts/index.css";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route path="article/:slug" element={<ArticlePage />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
