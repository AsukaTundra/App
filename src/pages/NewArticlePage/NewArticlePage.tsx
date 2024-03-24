import React from "react";

import type { ArticleFormValues } from "../../types/typesComponents";
import { newArticle } from "../../store/blogSlice";
import { useAppDispatch, useNav } from "../../hooks";
import ArticleForm from "../../components/articleForm";

export const NewArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNav();
  const funcRequest: (form: ArticleFormValues) => void = (form) => {
    dispatch(newArticle({ article: { ...form }, token: document.cookie.split("=")[1] }));
    setTimeout(() => navigate("/"), 600);
  };

  return <ArticleForm funcRequest={funcRequest} />;
};

export default NewArticlePage;
