import React from "react";

import Account from "../../components/account";
import type { FuncRequestForm } from "../../types";
import { loginUser } from "../../store/blogSlice";
import { useAppDispatch } from "../../hooks";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const requestForm: FuncRequestForm = (form) => {
    dispatch(loginUser(form));
  };

  return <Account funcRequest={requestForm} signIn={true} />;
};

export default SignIn;
