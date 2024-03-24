import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getArticle, deleteArticle } from "../../store/blogSlice";
import { useAppDispatch, useAppSelector, useNav } from "../../hooks";
import ArticleBlock from "../../components/articleBlock";
import ErrorBlock from "../../components/errorBlock";
import Loader from "../../components/loader";

export const ArticlePage: React.FC = () => {
  const appState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const { slug } = useParams();
  const navigate = useNav();

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
  } else {
    const data = { slug: slug, token: document.cookie.split("=")[1] };
    return (
      <ArticleBlock
        requestDelete={() => {
          dispatch(deleteArticle(data));
          setTimeout(() => navigate("/"), 600);
        }}
        requestCreated={() => {
          navigate(`/articles/${slug}/edit`);
        }}
        bodyVisible={true}
        contorlVisible={appState.articles.article.author.username === appState.user.username}
        parentKey={1}
        item={appState.articles.article}
      />
    );
  }
};
