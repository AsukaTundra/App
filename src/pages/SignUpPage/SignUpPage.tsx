import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { FuncRequestForm } from "../../types/typesComponents";
import { registerUser } from "../../store/blogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import AccountForm from "../../components/accountForm";

const SignUpPage: React.FC = () => {
  const appState = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const requestForm: FuncRequestForm = (form) => {
    dispatch(registerUser({ user: { username: form.username, email: form.email, password: form.password } }));
  };

  const navigate = useNavigate();
  const goMainPage = () => navigate("/");
  useEffect(() => {
    if (appState.user.token) {
      goMainPage();
    }
  }, [appState.user.token]);

  return <AccountForm funcRequest={requestForm} signUp={true} />;
};

export default SignUpPage;
