import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Article from "../../components/article";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getArticle } from "../../store/blogSlice";
import ErrorAlert from "../../components/error";
import Loader from "../../components/loader";

const ArticlePage: React.FC = () => {
  const appState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const { slug } = useParams(); // parameter

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
    return <ErrorAlert error={appState.error} />;
  } else if (appState.articles.article === null) {
    return <ErrorAlert error={"Not Found"} />;
  }
  return <Article bodyVisible={true} parentKey={1} item={appState.articles.article} />;
};

export default ArticlePage;
