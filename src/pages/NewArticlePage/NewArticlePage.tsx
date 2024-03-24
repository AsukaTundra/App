import React from "react";
import { useNavigate } from "react-router-dom";

import type { ArticleFormValues } from "../../types/typesComponents";
import { newArticle } from "../../store/blogSlice";
import { useAppDispatch } from "../../hooks";
import ArticleForm from "../../components/articleForm";

const NewArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const goMainPage = () => navigate("/");

  const funcRequest: (form: ArticleFormValues) => void = (form) => {
    dispatch(newArticle({ article: { ...form }, token: document.cookie.split("=")[1] }));
    setTimeout(() => goMainPage(), 600);
  };

  return <ArticleForm funcRequest={funcRequest} />;
};

export default NewArticlePage;
