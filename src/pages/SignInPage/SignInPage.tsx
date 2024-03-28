import React, { useEffect } from "react";

import type { AccountFormValues } from "../../components/accountForm/accountForm.tsx";
import { loginUser } from "../../store/blogSlice.ts";
import { useAppDispatch, useAppSelector, useNav } from "../../hooks/hooks.ts";
import AccountForm from "../../components/accountForm";

export const SignInPage: React.FC = () => {
  const userState = useAppSelector((state) => state.blog.user);
  const dispatch = useAppDispatch();

  const nav = useNav();

  useEffect(() => {
    if (userState.token) nav("/");
  }, [userState.token]);

  const requestForm: (form: AccountFormValues) => void = (form) => {
    dispatch(loginUser({ user: { email: form.email, password: form.password } }));
  };

  return <AccountForm funcRequest={requestForm} signIn={true} />;
};
