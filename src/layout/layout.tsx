import React from "react";
import { Link, Outlet } from "react-router-dom";

import { handlerLogOut } from "../store/blogSlice";
import { useAppSelector, useAppDispatch } from "../hooks";

import style from "./layout.module.scss";

const Layout: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.blog.user);

  return (
    <>
      {/* logo */}
      <header className={style.layout}>
        <button className={style.logo}>
          <Link to="/">
            <p>Realworld Blog</p>
          </Link>
        </button>

        {userData.token ? (
          // user block
          <>
            <div className={style.login}>
              <div className={style.div}>
                <Link to="/">
                  <p>Create article</p>
                </Link>
              </div>
              <div className={style.div}>
                <Link to="/" className={style.link}>
                  <p>{userData.username}</p>
                  <img src={userData.image || "https://static.productionready.io/images/smiley-cyrus.jpg"} alt="avatar" />
                </Link>
              </div>
              <div className={style.div}>
                <Link to="/" onClick={() => dispatch(handlerLogOut())}>
                  <p>Log Out</p>
                </Link>
              </div>
            </div>
          </>
        ) : (
          // main block
          <>
            <div className={style.notLogin}>
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
      <Outlet /> {/* page */}
    </>
  );
};

export default Layout;
