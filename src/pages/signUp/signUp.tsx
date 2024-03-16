import React from "react";
import { Divider } from "antd";
import { Link } from "react-router-dom";

import style from "./singUp.module.scss";

const SignUp: React.FC = () => {
  return (
    <div className={style.signUp}>
      <h2 className={style.title}>Create new account</h2>
      <form className={style.form}>
        <div className={style.formContainer}>
          <p className={style.text}>Username</p>
          <input className={style.inputText} type="text" placeholder="Username" />
          <p className={style.text}>Email address</p>
          <input className={style.inputText} type="text" placeholder="Email address" />
          <p className={style.text}>Password</p>
          <input className={style.inputText} type="text" placeholder="Password" />
          <p className={style.text}>Repeat Password</p>
          <input className={style.inputText} type="text" placeholder="Password" />
        </div>
        <Divider className={style.divider} />
        <label className={style.labelCheckbox}>
          <input className={style.inputCheckbox} type="checkbox" />
          <span className={style.spanCheckbox}>I agree to the processing of my personal information</span>
        </label>
        <button className={style.button} type="submit">
          Create
        </button>
      </form>
      <p className={style.signIn}>
        Already have an account?{" "}
        <Link className={style.signInLink} to="/">
          Sign In.
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
