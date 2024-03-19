import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";

import type { ArticleType } from "../../types";

import style from "./article.module.scss";

interface ArticleProps {
  bodyVisible: boolean;
  parentKey: number;
  item: ArticleType;
}

const Article: React.FC<ArticleProps> = ({ bodyVisible, parentKey, item }) => {
  const tags = item.tagList.map((tag, index) => {
    const key = index + parentKey; // key = index + key родителя
    return (
      <div key={key} className={style.tag}>
        <p>{tag}</p>
      </div>
    );
  });

  return (
    <div className={`${style.article} ${bodyVisible ? style.bodyVisible : null}`}>
      {/* content block */}
      <div className={style.content}>
        <Link className={style.title} to={`/article/${item.slug}`}>
          {item.title}
        </Link>
        <p className={style.like}>{item.favoritesCount}</p>
        <div className={style.tagsContainer}>{tags}</div>
        <p className={style.description}>{item.description}</p>
      </div>
      {/* author block */}
      <div className={style.author}>
        <p className={style.name}>{item.author.username}</p>
        <p className={style.createdDate}>{format(new Date(item.createdAt), "PP")}</p>
        <img className={style.img} src={item.author.image} alt="user avatar" />
      </div>
      {/* body block */}
      {bodyVisible && (
        <div className={style.bodyContainer}>
          <Markdown className={style.body}>{item.body}</Markdown>
        </div>
      )}
    </div>
  );
};

export default Article;
