import React, { useEffect } from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { handlerPagination, getArticles } from "../../store/blogSlice";
import Article from "../../components/article";
import ErrorAlert from "../../components/error";
import Loader from "../../components/loader";

import style from "./ArticleList.module.scss";

const ArticleListPage: React.FC = () => {
  const appState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [appState.articles.page, dispatch]);

  const onChange: PaginationProps["onChange"] = (page) => {
    dispatch(handlerPagination(page));
  };

  const elem = appState.articles.articles;
  const articles = elem.map((item, index) => {
    const key = index + Number(new Date(item.createdAt));
    return <Article key={key} bodyVisible={false} parentKey={key} item={{ ...item }} />;
  });

  return (
    <>
      {appState.loading ? <Loader /> : null}
      {appState.error ? <ErrorAlert error={appState.error} /> : null}
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

export default ArticleListPage;
