import React, { useState } from "react";
import { Divider } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAppSelector } from "../../hooks";
import type { AccountFormValues, AccountFormProps } from "../../types/typesComponents";

import style from "./accountForm.module.scss";

const AccountForm: React.FC<AccountFormProps> = ({ funcRequest, signUp = false, signIn = false, editProfile = false }) => {
  const appState = useAppSelector((state) => state.blog.user);
  const [repeatPass, setRepeatPass] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AccountFormValues>({ mode: "onBlur" });

  const onSubmit = (data: AccountFormValues) => {
    funcRequest(data);
    reset();
  };

  return (
    <div className={style.accountForm}>
      {signUp && <h2 className={style.title}>Create new account</h2>}
      {signIn && <h2 className={style.title}>Sign In</h2>}
      {editProfile && <h2 className={style.title}>Edit Profile</h2>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formContainer}>
          {/* username */}
          {(signUp || editProfile) && (
            <>
              <label>
                <p className={style.inputTitle}>Username</p>
                <input
                  className={`${style.inputText} ${errors.username ? style.redBorder : null}`}
                  {...register("username", {
                    required: "required",
                    pattern: { value: /^[a-zA-Z0-9]+$/, message: "only English letters and numbers" },
                    minLength: { value: 3, message: "minimum 3 characters" },
                    maxLength: { value: 20, message: "maximum 20 characters" },
                  })}
                  placeholder="Username"
                  defaultValue={editProfile ? `${appState.username}` : ""}
                />
              </label>
              <div>{errors?.username && <p className={style.inputInvalid}>{errors.username.message}</p>}</div>
            </>
          )}
          {/* email */}
          <label>
            <p className={style.inputTitle}>Email address</p>
            <input
              className={`${style.inputText} ${errors.email ? style.redBorder : null}`}
              {...register("email", {
                required: "required",
                pattern: { value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/, message: "invalid email" },
              })}
              placeholder="Email address"
              defaultValue={editProfile ? `${appState.email}` : ""}
            />
          </label>
          <div>{errors?.email && <p className={style.inputInvalid}>{errors.email.message}</p>}</div>
          {/* password/new password */}
          <label>
            <p className={style.inputTitle}>{editProfile ? "New Password" : "Password"}</p>
            <input
              className={`${style.inputText} ${errors.password ? style.redBorder : null}`}
              {...register("password", {
                required: "required",
                minLength: { value: 6, message: "minimum 6 characters" },
                maxLength: { value: 40, message: "maximum 40 characters" },
              })}
              placeholder="Password"
              type="password"
              onChange={(e) => setRepeatPass(e.target.value)}
            />
          </label>
          <div>{errors?.password && <p className={style.inputInvalid}>{errors.password.message}</p>}</div>
          {/* Repeat Password */}
          {signUp && (
            <>
              <label>
                <p className={style.inputTitle}>Repeat Password</p>
                <input
                  className={`${style.inputText} ${errors.repeatPassword ? style.redBorder : null}`}
                  {...register("repeatPassword", {
                    required: "required",
                    validate: (value) => value === repeatPass,
                  })}
                  placeholder="Pepeat password"
                  type="password"
                />
              </label>
              <div>{errors?.repeatPassword && <p className={style.inputInvalid}>{errors.repeatPassword.message}</p>}</div>
            </>
          )}
          {/* avatar image */}
          {editProfile && (
            <>
              <label>
                <p className={style.inputTitle}>Avatar image &#40;url&#41;</p>
                <input
                  className={`${style.inputText} ${errors.image ? style.redBorder : null}`}
                  {...register("image", {
                    pattern: {
                      value:
                        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/,
                      message: "invalid url",
                    },
                  })}
                  placeholder="Avatar image"
                />
              </label>
              <div>{errors?.image && <p className={style.inputInvalid}>{errors.image.message}</p>}</div>
            </>
          )}
        </div>
        {/* antd divider */}
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
              <span>I agree to the processing of my personal information</span>
            </label>
            <div>{errors?.personalInfo && <p className={style.inputInvalid}>{errors.personalInfo.message}</p>}</div>
          </>
        )}
        {/* submit button */}
        <button className={style.button} type="submit" onClick={() => handleSubmit(onSubmit)}>
          {signUp && "Create"}
          {signIn && "Login"}
          {editProfile && "Save"}
        </button>
      </form>
      {/* redirect */}
      {!editProfile && (
        <>
          <p className={style.signOther}>
            {signUp ? "Already have an account? " : "Don&#39;t have an account? "}
            <Link className={style.signOtherLink} to={signUp ? "/sign-in" : "/sign-up"}>
              {signUp ? "Sign In" : "Sign Up."}
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default AccountForm;
