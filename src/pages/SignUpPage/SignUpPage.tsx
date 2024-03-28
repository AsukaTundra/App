import React, { useEffect } from "react";

import type { AccountFormValues } from "../../components/accountForm/accountForm.tsx";
import { useAppDispatch, useAppSelector, useNav } from "../../hooks/hooks.ts";
import { registerUser } from "../../store/blogSlice.ts";
import AccountForm from "../../components/accountForm";

export const SignUpPage: React.FC = () => {
  const userState = useAppSelector((state) => state.blog.user);
  const dispatch = useAppDispatch();

  const navigate = useNav();
  useEffect(() => {
    if (userState.token) navigate("/");
  }, [userState.token]);

  const requestForm: (form: AccountFormValues) => void = (form) => {
    dispatch(registerUser({ user: { username: form.username, email: form.email, password: form.password } }));
  };

  return <AccountForm funcRequest={requestForm} signUp={true} />;
};
