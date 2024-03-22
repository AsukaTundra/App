import React from "react";

import ArticleForm from "../../components/articleForm";
import type { FormArticleValues } from "../../components/articleForm/articleForm";
import { newArticle } from "../../store/blogSlice";
import { useAppDispatch } from "../../hooks/hooks";

const NewArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const funcRequest: (form: FormArticleValues) => void = (form) => {
    dispatch(newArticle({ data: { article: { ...form } }, token: document.cookie.split("=")[1] }));
  };

  return <ArticleForm funcRequest={funcRequest} />;
};

export default NewArticlePage;
