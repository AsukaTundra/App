/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import type { ArticleType } from "../../types";

import style from "./article.module.scss";

interface ArticleProps {
  parentKey: number;
  item: ArticleType;
}

const Article: React.FC<ArticleProps> = ({ parentKey, item }) => {
  const tags = item.tagList.map((tag, index) => {
    const key = index + parentKey;
    return (
      <div key={key} className={style.tag}>
        <p>{tag}</p>
      </div>
    );
  });

  return (
    <div className={style.article}>
      <div className={style.content}>
        <Link className={style.title} to={`/article/${item.slug}`}>
          {item.title}
        </Link>
        <p className={style.like}>{item.favoritesCount}</p>
        <div className={style.tagsContainer}>{tags}</div>
        <p className={style.description}>{item.description}</p>
      </div>
      <div className={style.author}>
        <p className={style.name}>{item.author.username}</p>
        <p className={style.createdDate}>{format(new Date(item.createdAt), "PP")}</p>
        <img className={style.img} src={item.author.image} alt="user avatar" />
      </div>
    </div>
  );
};

export default Article;
