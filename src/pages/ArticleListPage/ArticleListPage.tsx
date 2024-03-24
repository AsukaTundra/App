import React, { useEffect } from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

import { handlerPagination, getArticles } from "../../store/blogSlice";
import { useAppSelector, useAppDispatch, useNav } from "../../hooks";
import ArticleBlock from "../../components/articleBlock";
import ErrorBlock from "../../components/errorBlock";
import Loader from "../../components/loader";

import style from "./ArticleList.module.scss";

export const ArticleListPage: React.FC = () => {
  const appState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();
  const navigate = useNav();

  useEffect(() => {
    dispatch(getArticles(appState.articles.page));
  }, [appState.articles.page, dispatch]);

  const onChange: PaginationProps["onChange"] = (page) => {
    dispatch(handlerPagination(page));
    navigate("/");
  };

  const articles = appState.articles.articles.map((item, index) => {
    const key = index + Number(new Date(item.createdAt));
    return <ArticleBlock key={key} bodyVisible={false} parentKey={key} item={{ ...item }} />;
  });

  return (
    <>
      {appState.loading ? <Loader /> : null}
      {appState.error ? <ErrorBlock error={appState.error} /> : null}
      {!appState.error && !appState.loading ? (
        <>
          <div className={style.list}>{articles}</div>
          <Pagination
            className={style.pagination}
            defaultCurrent={appState.articles.page}
            onChange={onChange}
            total={150}
            showSizeChanger={false}
          />
        </>
      ) : null}
    </>
  );
};
