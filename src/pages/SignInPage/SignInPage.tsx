import React, { useEffect } from "react";

import type { FuncRequestForm } from "../../types/typesComponents";
import { loginUser } from "../../store/blogSlice";
import { useAppDispatch, useAppSelector, useNav } from "../../hooks";
import AccountForm from "../../components/accountForm";

export const SignInPage: React.FC = () => {
  const userState = useAppSelector((state) => state.blog.user);
  const dispatch = useAppDispatch();

  const nav = useNav();
  useEffect(() => {
    if (userState.token) {
      nav("/");
    }
  }, [userState.token]);

  const requestForm: FuncRequestForm = (form) => {
    dispatch(loginUser({ user: { email: form.email, password: form.password } }));
  };

  return <AccountForm funcRequest={requestForm} signIn={true} />;
};
