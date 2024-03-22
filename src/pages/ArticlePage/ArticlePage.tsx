import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { getArticle } from "../../store/blogSlice";
import ArticleBlock from "../../components/articleBlock";
import ErrorBlock from "../../components/errorBlock";
import Loader from "../../components/loader";

const ArticlePage: React.FC = () => {
  const appState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      dispatch(getArticle(slug));
    } else {
      return;
    }
  }, [dispatch, slug]);

  if (appState.loading === true) {
    return <Loader />;
  } else if (appState.error) {
    return <ErrorBlock error={appState.error} />;
  } else if (appState.articles.article === null) {
    return <ErrorBlock error={"Not Found"} />;
  }
  return <ArticleBlock bodyVisible={true} parentKey={1} item={appState.articles.article} />;
};

export default ArticlePage;
