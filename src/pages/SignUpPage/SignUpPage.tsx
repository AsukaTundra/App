import React, { useEffect } from "react";

import type { FuncRequestForm } from "../../types/typesComponents";
import { useAppDispatch, useAppSelector, useNav } from "../../hooks";
import { registerUser } from "../../store/blogSlice";
import AccountForm from "../../components/accountForm";

export const SignUpPage: React.FC = () => {
  const userState = useAppSelector((state) => state.blog.user);
  const dispatch = useAppDispatch();

  const navigate = useNav();
  useEffect(() => {
    if (userState.token) {
      navigate("/");
    }
  }, [userState.token]);

  const requestForm: FuncRequestForm = (form) => {
    dispatch(registerUser({ user: { username: form.username, email: form.email, password: form.password } }));
  };

  return <AccountForm funcRequest={requestForm} signUp={true} />;
};
