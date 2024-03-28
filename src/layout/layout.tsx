import React from "react";
import { Outlet, Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../hooks/hooks.ts";
import { handlerLogOut, handlerPagination } from "../store/blogSlice.ts";

import style from "./layout.module.scss";

export const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.blog.user);

  return (
    <>
      <header className={style.header}>
        <button className={style.logo} onClick={() => dispatch(handlerPagination(1))}>
          <Link to="/">
            <p>Realworld Blog</p>
          </Link>
        </button>

        {userState.token ? (
          <>
            <div className={style.userBlock}>
              <div className={style.container}>
                <Link to="new-article">
                  <p>Create article</p>
                </Link>
              </div>

              <div className={style.container}>
                <Link to="edit-profile" className={style.link}>
                  <p>{userState.username}</p>
                  <img src={userState.image || "https://static.productionready.io/images/smiley-cyrus.jpg"} alt="avatar" />
                </Link>
              </div>

              <div className={style.container}>
                <Link
                  to="/"
                  onClick={() => {
                    dispatch(handlerLogOut());
                    document.cookie = "token=null; max-age=0";
                  }}>
                  <p>Log Out</p>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={style.logOut}>
              <button className={style.button}>
                <Link to="sign-in">
                  <p>Sign In</p>
                </Link>
              </button>

              <button className={style.button}>
                <Link to="sign-up">
                  <p>Sign Up</p>
                </Link>
              </button>
            </div>
          </>
        )}
      </header>
      <Outlet />
    </>
  );
};
