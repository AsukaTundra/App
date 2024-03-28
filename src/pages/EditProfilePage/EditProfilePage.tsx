import React from "react";

import type { AccountFormValues } from "../../components/accountForm/accountForm.tsx";
import { updateUser } from "../../store/blogSlice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import AccountForm from "../../components/accountForm";

export const EditProfilePage: React.FC = () => {
  const userState = useAppSelector((state) => state.blog.user);
  const dispatch = useAppDispatch();

  const requestForm: (form: AccountFormValues) => void = (form) => {
    const data = {
      user: {
        username: form.username,
        email: form.email,
        password: form.password,
        image: form.image === "" && userState.image ? userState.image : form.image,
      },
      token: document.cookie.split("=")[1],
    };
    dispatch(updateUser(data));
  };

  return <AccountForm funcRequest={requestForm} editProfile={true} />;
};
