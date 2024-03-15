import React from "react";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { handlerPagination, getArticles } from "../../store/blogSlice";
import Article from "../article";

import style from "./list.module.scss";

const List: React.FC = () => {
  const blogState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const onChange: PaginationProps["onChange"] = (page) => {
    dispatch(handlerPagination(page));
  };

  console.log(blogState.articles);

  return (
    <>
      <div className={style.list}>
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
      <button onClick={() => dispatch(getArticles())}>
        <p>вызов билетов</p>
      </button>
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
