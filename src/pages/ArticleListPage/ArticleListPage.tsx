import React, { useEffect } from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

import { handlerPagination, getArticles } from "../../store/blogSlice.ts";
import { useAppSelector, useAppDispatch, useNav } from "../../hooks/hooks.ts";
import ArticleBlock from "../../components/articleBlock";
import ErrorBlock from "../../components/errorBlock";
import Loader from "../../components/loader";

import style from "./ArticleList.module.scss";

export const ArticleListPage: React.FC = () => {
  const appState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();
  const navigate = useNav();

  useEffect(() => {
    dispatch(getArticles({ page: appState.articles.page, token: document.cookie.split("=")[1] }));
  }, [appState.articles.page]);

  const onChange: PaginationProps["onChange"] = (page) => {
    dispatch(handlerPagination(page));
    navigate("/");
  };

  const articles = appState.articles.articles.map((item) => {
    return <ArticleBlock key={self.crypto.randomUUID()} item={item} body={false} slug={item.slug} />;
  });

  if (appState.loading) {
    return <Loader />;
  } else if (appState.error) {
    return <ErrorBlock error={appState.error} />;
  } else {
    return (
      <>
        <div className={style.list}>{articles}</div>
        <Pagination className={style.pagination} defaultCurrent={appState.articles.page} onChange={onChange} total={150} showSizeChanger={false} />
      </>
    );
  }
};
