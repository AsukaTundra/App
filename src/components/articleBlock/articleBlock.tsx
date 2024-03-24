import React, { useState } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";
import { format } from "date-fns";

import type { ArticleBlockProps } from "../../types/typesComponents";

import style from "./articleBlock.module.scss";

const ArticleBlock: React.FC<ArticleBlockProps> = ({
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
            <div className={style.titleContainer}>
              <div className={`${style.author} ${bodyVisible ? style.marginBottom : null}`}>
                <p className={style.name}>{item.author.username}</p>
                <p className={style.createdDate}>{format(new Date(item.createdAt), "PP")}</p>
                <img className={style.img} src={item.author.image} alt="user avatar" />
              </div>
              {bodyVisible && contorlVisible ? (
                <>
                  <div className={style.divButtons}>
                    <button className={style.button} onClick={() => setWindowDelete(true)}>
                      Delete
                    </button>
                    <button className={style.button} onClick={() => requestCreated()}>
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
          {bodyVisible && (
            <div className={style.bodyContainer}>
              <Markdown className={style.body}>{item.body}</Markdown>
            </div>
          )}
        </div>
        {windowDelete && (
          <>
            <div className={style.deleteContainer}>
              <p className={style.text}>Are you sure to delete this article?</p>
              <button className={style.button} onClick={() => setWindowDelete(false)}>
                No
              </button>
              <button className={style.button} onClick={() => requestDelete()}>
                Yes
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ArticleBlock;
