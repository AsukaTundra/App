/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { handlerPagination, getArticles } from "../../store/blogSlice";
import Article from "../../components/article";

import style from "./list.module.scss";

const List: React.FC = () => {
  const blogState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [blogState.page, dispatch]);

  const onChange: PaginationProps["onChange"] = (page) => {
    dispatch(handlerPagination(page));
  };

  const elem = blogState.articles;
  const articles = elem.map((item, index) => {
    const key = index + Number(new Date(item.createdAt));
    return <Article key={key} parentKey={key} item={{ ...item }} />;
  });

  return (
    <>
      <div className={style.list}>{articles}</div>
      <Pagination
        className={style.pagination}
        defaultCurrent={blogState.page}
        onChange={onChange}
        total={150}
        showSizeChanger={false}
      />
    </>
  );
};

export default List;
