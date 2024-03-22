import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Account from "../../components/account";
import type { FuncRequestForm } from "../../types/types";
import { loginUser } from "../../store/blogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.blog);

  const requestForm: FuncRequestForm = (form) => {
    dispatch(loginUser(form));
  };

  const navigate = useNavigate();
  const goMainPage = () => navigate("/");
  useEffect(() => {
    if (appState.user.token) {
      goMainPage();
    }
  }, [appState.user.token]);

  return <Account funcRequest={requestForm} signIn={true} />;
};

export default SignInPage;
