import React, { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";

import type { ArticleBlockProps } from "../../types/typesComponents";
// import { deleteArticle } from "../../store/blogSlice";

import style from "./articleBlock.module.scss";

const ArticleBlock: React.FC<ArticleBlockProps> = ({ bodyVisible, parentKey, item }) => {
  // const [doDelete, setDoDelete] = useState(0);

  const tags = item.tagList.map((tag, index) => {
    const key = index + parentKey;
    return (
      <div key={key} className={style.tag}>
        <p>{tag}</p>
      </div>
    );
  });

  return (
    <div className={`${style.articleBlock} ${bodyVisible ? style.bodyVisible : null}`}>
      {/* content */}
      <div className={style.content}>
        <Link className={style.title} to={`/article/${item.slug}`}>
          {/* author */}
          <div className={`${style.author} ${bodyVisible ? style.marginBottom : null}`}>
            <p className={style.name}>{item.author.username}</p>
            <p className={style.createdDate}>{format(new Date(item.createdAt), "PP")}</p>
            <img className={style.img} src={item.author.image} alt="user avatar" />
          </div>
          {bodyVisible && (
            <>
              <div className={style.divButtons}>
                <button className={style.button} onClick={() => console.log(1)}>
                  Delete
                </button>
                <button className={style.button} onClick={() => console.log(1)}>
                  Edit
                </button>
              </div>
            </>
          )}
          {item.title}
        </Link>
        <p className={style.like}>{item.favoritesCount}</p>
        <div>{tags}</div>
        <p className={style.description}>{item.description}</p>
      </div>
      {/* body */}
      {bodyVisible && (
        <div className={style.bodyContainer}>
          <Markdown className={style.body}>{item.body}</Markdown>
        </div>
      )}
    </div>
  );
};

export default ArticleBlock;
