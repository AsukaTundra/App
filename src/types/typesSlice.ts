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

// --- статьи
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

export type PropsNewArticle = {
  article: {
    title: string,
    description: string,
    body: string,
    tags?: string[],
  },
  token: string,
};

export type ReturnNewArticle = ReturnGetArticle;

export type PropsDeleteArticle = {
  slug?: string,
  token: string,
};

export type PropsUpdateArticle = {
  article: {
    title: string,
    description: string,
    body: string,
  },
  slug: string,
  token: string,
};

// --- аккаунт

export type ReturnRegisterUser = {
  user: {
    email: string,
    token: string,
    username: string,
  },
};

export type PropsRegisterUser = {
  user: {
    username: string,
    email: string,
    password: string,
  },
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
  user: {
    email: string,
    password: string,
  },
};

export type PropsUpdateUser = {
  user: {
    username: string,
    email: string,
    password: string,
    image?: string,
  },
  token: string,
};
