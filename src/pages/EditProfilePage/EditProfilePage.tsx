import React from "react";

import Account from "../../components/account";
import type { FuncRequestForm } from "../../types/types";
import { updateUser } from "../../store/blogSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const EditProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.blog);

  const requestForm: FuncRequestForm = (form) => {
    if (!form.image) {
      delete form.image;
    }
    dispatch(updateUser({ user: { ...form, token: document.cookie.split("=")[1] } }));
  };

  return <Account funcRequest={requestForm} editProfile={true} />;
};

export default EditProfilePage;
