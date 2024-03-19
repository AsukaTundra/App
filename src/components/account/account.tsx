import React, { useState } from "react";
import { Divider } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import type { FuncRequestForm } from "../../types";

import style from "./account.module.scss";

interface AccountProps {
  funcRequest: FuncRequestForm;
  signUp?: boolean;
  signIn?: boolean;
  editProfile?: boolean;
}
type FormValues = {
  username: string,
  email: string,
  password: string,
  repeatPassword: string,
  personalInfo: boolean,
};

const Account: React.FC<AccountProps> = ({ funcRequest, signUp = false, signIn = false, editProfile = false }) => {
  // состояние password для repeat password
  const [pass, setPass] = useState("");

  // useForm
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ mode: "onBlur" });

  const onSubmit = (data: FormValues) => {
    funcRequest(data);
    reset();
  };

  return (
    <div className={style.account}>
      {/* заголовок */}
      {signUp && <h2 className={style.title}>Create new account</h2>}
      {signIn && <h2 className={style.title}>Sign In</h2>}
      {editProfile && <h2 className={style.title}>Edit Profile</h2>}

      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formContainer}>
          {/* Username */}
          {(signUp || editProfile) && (
            <>
              <label>
                <p className={style.text}>Username</p>
                <input
                  className={`${style.inputText} ${errors?.username ? style.redBorder : null}`}
                  {...register("username", {
                    required: "required",
                    pattern: { value: /^[a-zA-Z0-9]+$/, message: "only English letters and numbers" },
                    minLength: { value: 3, message: "minimum 3 characters" },
                    maxLength: { value: 20, message: "maximum 20 characters" },
                  })}
                  placeholder="Username"
                />
              </label>
              <div>{errors?.username && <p className={style.invalidText}>{errors.username.message}</p>}</div>
            </>
          )}

          {/* Email */}
          <label>
            <p className={style.text}>Email address</p>
            <input
              className={`${style.inputText} ${errors.email ? style.redBorder : null}`}
              {...register("email", {
                required: "required",
                pattern: { value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, message: "invalid email" },
              })}
              placeholder="Email address"
            />
          </label>
          <div>{errors?.email && <p className={style.invalidText}>{errors.email.message}</p>}</div>

          {/* Password/New Password */}
          <label>
            <p className={style.text}>{editProfile ? "New Password" : "Password"}</p>
            <input
              className={`${style.inputText} ${errors.password ? style.redBorder : null}`}
              {...register("password", {
                required: "required",
                minLength: { value: 6, message: "minimum 6 characters" },
                maxLength: { value: 40, message: "maximum 40 characters" },
              })}
              placeholder="Password"
              onChange={(e) => setPass(e.target.value)}
            />
          </label>
          <div>{errors?.password && <p className={style.invalidText}>{errors.password.message}</p>}</div>

          {/* Repeat Password */}
          {signUp && (
            <>
              <label>
                <p className={style.text}>Repeat Password</p>
                <input
                  className={`${style.inputText} ${errors.repeatPassword ? style.redBorder : null}`}
                  {...register("repeatPassword", {
                    required: "required",
                    validate: (value) => value === pass,
                  })}
                  placeholder="Pepeat password"
                />
              </label>
              <div>{errors?.repeatPassword && <p className={style.invalidText}>{errors.repeatPassword.message}</p>}</div>
            </>
          )}
        </div>

        {/* Antd Divider */}
        {signUp && (
          <>
            <Divider className={style.divider} />
            <label className={style.labelCheckbox}>
              <input
                className={style.inputCheckbox}
                type="checkbox"
                {...register("personalInfo", {
                  required: "required",
                })}
              />
              <span className={style.spanCheckbox}>I agree to the processing of my personal information</span>
            </label>
            <div>{errors?.personalInfo && <p className={style.invalidText}>{errors.personalInfo.message}</p>}</div>
          </>
        )}

        {/* Submit Button */}
        <button className={style.button} type="submit" onClick={() => handleSubmit(onSubmit)}>
          {signUp && "Create"}
          {signIn && "Login"}
          {editProfile && "Save"}
        </button>
      </form>

      {/* Help */}
      {signUp && (
        <>
          <p className={style.signOther}>
            Already have an account?{" "}
            <Link className={style.signOtherLink} to="/sign-in">
              Sign In.
            </Link>
          </p>
        </>
      )}
      {signIn && (
        <>
          <p className={style.signOther}>
            Don&#39;t have an account?{" "}
            <Link className={style.signOtherLink} to="/sign-up">
              Sign Up.
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Account;
