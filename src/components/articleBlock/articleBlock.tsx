import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Markdown from "react-markdown";

import type { ArticleBlockProps } from "../../types/typesComponents";

import style from "./articleBlock.module.scss";

export const ArticleBlock: React.FC<ArticleBlockProps> = ({
  requestDelete,
  requestCreated,
  bodyVisible,
  contorlVisible,
  parentKey,
  item,
}) => {
  const [windowDelete, setWindowDelete] = useState(false);

  const tags = item.tagList.map((tag, index) => {
    const key = index + parentKey;
    return (
      <div key={key} className={style.tag}>
        <p>{tag}</p>
      </div>
    );
  });

  return (
    <>
      <div className={`${style.articleBlock} ${bodyVisible ? style.bodyVisible : null}`}>
        <div className={style.container}>
          <div className={style.content}>
            {/* title */}
            <div className={style.titleContainer}>
              {/* author */}
              <div className={`${style.author} ${bodyVisible ? style.marginBottom : null}`}>
                <p className={style.name}>{item.author.username}</p>
                <p className={style.createdDate}>{format(new Date(item.createdAt), "PP")}</p>
                <img className={style.img} src={item.author.image} alt="user avatar" />
              </div>
              {/* delete/edit buttons */}
              {bodyVisible && contorlVisible ? (
                <>
                  <div className={style.divButtons}>
                    <button className={style.button} onClick={() => setWindowDelete(true)}>
                      Delete
                    </button>
                    <button className={style.button} onClick={() => (requestCreated ? requestCreated() : null)}>
                      Edit
                    </button>
                  </div>
                </>
              ) : null}
              <Link to={`/article/${item.slug}`}>{item.title}</Link>
              <p className={style.like}>{item.favoritesCount}</p>
              <div>{tags}</div>
              <p className={style.description}>{item.description}</p>
            </div>
          </div>

          {/* body */}
          {bodyVisible && (
            <div className={style.bodyContainer}>
              <Markdown className={style.body}>{item.body}</Markdown>
            </div>
          )}
        </div>
        {/* delete window */}
        {windowDelete && (
          <>
            <div className={style.deleteContainer}>
              <p className={style.text}>Are you sure to delete this article?</p>
              <button className={style.button} onClick={() => setWindowDelete(false)}>
                No
              </button>
              <button className={style.button} onClick={() => (requestDelete ? requestDelete() : null)}>
                Yes
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
