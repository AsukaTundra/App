// --- accountForm

export type AccountFormValues = {
  username: string,
  email: string,
  password: string,
  repeatPassword?: string,
  personalInfo?: boolean,
  image?: string,
};

export type AccountFormProps = {
  funcRequest: FuncRequestForm,
  signUp?: boolean,
  signIn?: boolean,
  editProfile?: boolean,
};

export type FuncRequestForm = (form: AccountFormValues) => void;

// --- articleBlock

import { ArticleType } from "./typesSlice";

export type ArticleBlockProps = {
  bodyVisible: boolean,
  parentKey: number,
  item: ArticleType,
};

// --- articleForm

export type ArticleFormValues = {
  title: string,
  description: string,
  body: string,
  tagList: string[],
};

export type ArticleFormProps = {
  funcRequest: (data: ArticleFormValues) => void,
};

// --- ErrorBlock

export type PropsErrorBlock = {
  error: string,
};