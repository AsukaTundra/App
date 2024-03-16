import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../layout";
import List from "../pages/list";
import Article from "../pages/article";
import SignUp from "../pages/signUp";

import "../assets/fonts/index.css";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<List />} />
          <Route path="article/:slug" element={<Article />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
