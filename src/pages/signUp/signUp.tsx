import React from "react";

import Account from "../../components/account";
import type { FuncRequestForm } from "../../types";
import { registerUser } from "../../store/blogSlice";
import { useAppDispatch } from "../../hooks";

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();

  const requestForm: FuncRequestForm = (form) => {
    dispatch(registerUser(form));
  };

  return <Account funcRequest={requestForm} signUp={true} />;
};

export default SignUp;
