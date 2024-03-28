import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Markdown from "react-markdown";

import { deleteArticle, favoritedArticle } from "../../store/blogSlice.ts";
import { useAppDispatch, useAppSelector, useNav } from "../../hooks/hooks.ts";
import type { ArticleType } from "../../store/typesSlice.ts";

import style from "./articleBlock.module.scss";

type ArticleBlockProps = {
  item: ArticleType,
  slug: string,
  body: boolean,
};

export const ArticleBlock: React.FC<ArticleBlockProps> = ({ item, body, slug }) => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.blog);
  const [windowDelete, setWindowDelete] = useState(false);
  const [like, setLike] = useState(item.favorited);
  const [likeCount, setLikeCount] = useState(item.favoritesCount);
  const navigate = useNav();

  const tags = item.tagList.map((tag) => {
    return (
      <div key={self.crypto.randomUUID()} className={style.tag}>
        <p>{tag}</p>
      </div>
    );
  });

  const control = appState.user.username === appState.articles.article?.author.username;

  const data = { slug: slug, token: document.cookie.split("=")[1] };

  const debounce = () => {
    let qwe: NodeJS.Timeout | undefined;
    return () => {
      clearTimeout(qwe);
      qwe = setTimeout(() => {
        dispatch(favoritedArticle({ ...data, favorited: item.favorited }));
        setLikeCount(!like ? likeCount + 1 : likeCount - 1);
        setLike(!like);
      }, 600);
    };
  };

  const likeRequest = debounce();

  return (
    <section className={`${style.articleBlock} ${body ? style.bodyVisible : null}`}>
      <div className={style.container}>
        <div className={style.titleContainer}>
          <div className={`${style.author} ${body ? style.marginBottom : null}`}>
            <p className={style.name}>{item.author.username}</p>
            <p className={style.createdDate}>{format(new Date(item.createdAt), "PP")}</p>
            <img className={style.img} src={item.author.image} alt="user avatar" />
          </div>

          {body && control ? (
            <>
              <div className={style.divButtons}>
                <button className={style.button} onClick={() => setWindowDelete(true)}>
                  Delete
                </button>
                <button className={style.button} onClick={() => navigate(`/articles/${slug}/edit`)}>
                  Edit
                </button>
              </div>
            </>
          ) : null}

          <Link to={`/article/${item.slug}`}>{item.title}</Link>
          <button
            onClick={() => {
              likeRequest();
            }}>
            <p className={`${style.like} ${like ? style.onLike : null}`}>{likeCount}</p>
          </button>
          <div>{tags}</div>
          <p className={style.description}>{item.description}</p>
        </div>

        {body && (
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
            <button
              className={style.button}
              onClick={() => {
                dispatch(deleteArticle(data));
                setTimeout(() => navigate("/"), 600);
              }}>
              Yes
            </button>
          </div>
        </>
      )}
    </section>
  );
};
