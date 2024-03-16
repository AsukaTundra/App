/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { getArticle } from "../../store/blogSlice";

import style from "./article.module.scss";

const Article: React.FC = () => {
  const article = useAppSelector((state) => state.blog.article);
  const dispatch = useAppDispatch();

  console.log(article);

  const slug: { slug?: string } = useParams();

  useEffect(() => {
    if (slug.slug) {
      dispatch(getArticle(slug.slug));
    } else {
      return;
    }
  }, [dispatch, slug]);

  if (article === null) {
    return <p>not found</p>;
  }

  const tags = article.tagList.map((tag, index) => {
    const key = index + Number(new Date(article.createdAt));
    return (
      <div key={key} className={style.tag}>
        <p>{tag}</p>
      </div>
    );
  });

  return (
    <div className={style.article}>
      <div className={style.content}>
        <h2 className={style.title} onClick={() => console.log(1)}>
          {article.title}
        </h2>
        <p className={style.like}>{article.favoritesCount}</p>
        <div className={style.tagsContainer}>{tags}</div>
        <p className={style.description}>{article.description}</p>
      </div>
      <div className={style.author}>
        <p className={style.name}>{article.author.username}</p>
        <p className={style.createdDate}>{format(new Date(article.createdAt), "PP")}</p>
        <img className={style.img} src={article.author.image} alt="user avatar" />
      </div>
      <div className={style.bodyContainer}>
        <p className={style.body}>{article.body}</p>
      </div>
    </div>
  );
};

export default Article;
