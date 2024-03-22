import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Account from "../../components/account";
import type { FuncRequestForm } from "../../types/types";
import { registerUser } from "../../store/blogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const SignUpPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.blog);

  const requestForm: FuncRequestForm = (form) => {
    dispatch(registerUser(form));
  };

  const navigate = useNavigate();
  const goMainPage = () => navigate("/");
  useEffect(() => {
    if (appState.user.token) {
      goMainPage();
    }
  }, [appState.user.token]);

  return <Account funcRequest={requestForm} signUp={true} />;
};

export default SignUpPage;
