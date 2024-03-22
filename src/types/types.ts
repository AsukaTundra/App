export type State = {
  error: string | undefined,
  loading: boolean,
  articles: {
    page: number,
    article: ArticleType | null,
    articles: ArticleType[],
  },
  user: {
    email: string,
    token: string,
    username: string,
    bio?: string,
    image?: string | null,
  },
};

// ------------------------------------------- статьи
export type ArticleType = {
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: string[],
  createdAt: string,
  updatedAt: string,
  favorited: boolean,
  favoritesCount: number,
  author: {
    username: string,
    bio?: string,
    image: string,
    following: boolean,
  },
};

export type ReturnGetArticles = {
  articles: ArticleType[],
  articlesCount: number,
};

export type ReturnGetArticle = {
  article: ArticleType,
};

// ------------------------------------------- регистрация/авторизация

export type ReturnRegisterUser = {
  user: {
    email: string,
    token: string,
    username: string,
  },
};

export type PropsRegisterUser = {
  username: string,
  email: string,
  password: string,
};

export type ReturnLoginUser = {
  user: {
    email: string,
    token: string,
    username: string,
    bio?: string,
    image?: string | null,
  },
};

export type PropsLoginUser = {
  email: string,
  password: string,
};

// ------------------------------------------- изменение данных аккаунта

export type PropsUpdateUser = {
  user: {
    username: string,
    email: string,
    password: string,
    image?: string,
    token: string,
  },
};

// компонент аккаунта
export type StateFormAccount = {
  username: string,
  email: string,
  password: string,
  repeatPassword?: string,
  personalInfo?: boolean,
};

type FormValues = {
  username: string,
  email: string,
  password: string,
  repeatPassword?: string,
  personalInfo?: boolean,
  image?: string,
};

export type FuncRequestForm = (form: FormValues) => void;

// ------------------------------------- новая статья

export type NewArticleProps = {
  article: {
    title: string,
    description: string,
    body: string,
    tags?: string[],
  },
};
