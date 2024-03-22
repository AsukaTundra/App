import React from "react";

import type { FuncRequestForm } from "../../types/typesComponents";
import { updateUser } from "../../store/blogSlice";
import { useAppDispatch } from "../../hooks";
import AccountForm from "../../components/accountForm";

const EditProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const requestForm: FuncRequestForm = (form) => {
    const data = {
      user: { username: form.username, email: form.email, password: form.password, image: form.image },
      token: document.cookie.split("=")[1],
    };
    if (!form.image) {
      delete form.image;
    }
    dispatch(updateUser(data));
  };

  return <AccountForm funcRequest={requestForm} editProfile={true} />;
};

export default EditProfilePage;
