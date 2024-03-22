import React from "react";

import type { ArticleFormValues } from "../../types/typesComponents";
import { newArticle } from "../../store/blogSlice";
import { useAppDispatch } from "../../hooks";
import ArticleForm from "../../components/articleForm";

const NewArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const funcRequest: (form: ArticleFormValues) => void = (form) => {
    dispatch(newArticle({ article: { ...form }, token: document.cookie.split("=")[1] }));
  };

  return <ArticleForm funcRequest={funcRequest} />;
};

export default NewArticlePage;
