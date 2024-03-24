import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { getArticle } from "../../store/blogSlice";
import ArticleForm from "../../components/articleForm";
import { ArticleFormValues } from "../../types/typesComponents";

import style from "./ArticleEditPage.module.scss";

const ArticleEditPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.blog);
  const slug = useParams();

  const navigate = useNavigate();
  const goMainPage = () => navigate("/");

  if (slug.slug) {
    dispatch(getArticle(slug.slug));
  }

  const funcRequest: (form: ArticleFormValues) => void = (form) => {
    console.log(form);
    setTimeout(() => goMainPage(), 600);
  };

  return <ArticleForm funcRequest={funcRequest} />;
};

export default ArticleEditPage;
