import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { getArticle, deleteArticle } from "../../store/blogSlice";
import ArticleBlock from "../../components/articleBlock";
import ErrorBlock from "../../components/errorBlock";
import Loader from "../../components/loader";

const ArticlePage: React.FC = () => {
  const appState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const { slug } = useParams();

  const navigate = useNavigate();
  const goMainPage = () => navigate("/");
  const goArticleEditPage = () => navigate(`/articles/${slug}/edit`);

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

  const data = { slug: slug, token: document.cookie.split("=")[1] };
  return (
    <ArticleBlock
      requestDelete={() => {
        dispatch(deleteArticle(data));
        setTimeout(() => goMainPage(), 600);
      }}
      requestCreated={() => {
        goArticleEditPage();
      }}
      bodyVisible={true}
      contorlVisible={appState.articles.article.author.username === appState.user.username}
      parentKey={1}
      item={appState.articles.article}
    />
  );
};

export default ArticlePage;
