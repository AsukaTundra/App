import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getArticle } from "../../store/blogSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import ArticleBlock from "../../components/articleBlock";
import ErrorBlock from "../../components/errorBlock";
import Loader from "../../components/loader";

export const ArticlePage: React.FC = () => {
  const appState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) dispatch(getArticle({ slug: slug, token: document.cookie.split("=")[1] }));
  }, [slug]);

  if (appState.loading === true) {
    return <Loader />;
  } else if (appState.error) {
    return <ErrorBlock error={appState.error} />;
  } else if (appState.articles.article === null || !slug) {
    return <ErrorBlock error={"Not Found"} />;
  } else {
    return <ArticleBlock item={appState.articles.article} body={true} slug={slug} />;
  }
};
