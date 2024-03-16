import React from "react";
import { Link, Outlet } from "react-router-dom";

import style from "./layout.module.scss";

const Layout: React.FC = () => {
  return (
    <>
      <header className={style.layout}>
        <button className={style.logo}>
          <Link to="/">
            <p>Realworld Blog</p>
          </Link>
        </button>
        <button className={style.button}>
          {/* <Link to="sign-up"> */}
          <p>Sign In</p>
          {/* </Link> */}
        </button>
        <button className={style.button}>
          <Link to="sign-up">
            <p>Sign Up</p>
          </Link>
        </button>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
