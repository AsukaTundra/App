import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { FuncRequestForm } from "../../types/typesComponents";
import { loginUser } from "../../store/blogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import AccountForm from "../../components/accountForm";

const SignInPage: React.FC = () => {
  const appState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const requestForm: FuncRequestForm = (form) => {
    dispatch(loginUser({ user: { email: form.email, password: form.password } }));
  };

  const navigate = useNavigate();
  const goMainPage = () => navigate("/");
  useEffect(() => {
    if (appState.user.token) {
      goMainPage();
    }
  }, [appState.user.token]);

  return <AccountForm funcRequest={requestForm} signIn={true} />;
};

export default SignInPage;
