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

export type PropsGetArticles = {
  page: number,
  token?: string,
};

export type ReturnGetArticles = {
  articles: ArticleType[],
  articlesCount: number,
};

export type PropsGetArticle = {
  slug: string,
  token?: string,
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
  token?: string,
};

export type PropsRequestNewArticle = {
  article: {
    title: string,
    description: string,
    body: string,
    tags?: string[],
  },
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

export type PropsRequestUpdateArticle = {
  article: {
    title: string,
    description: string,
    body: string,
  },
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

export type PropsRequestUpdateUser = {
  user: {
    username: string,
    email: string,
    password: string,
    image?: string,
  },
};

export type PropsFavoritedArticle = {
  slug: string,
  token: string,
  favorited: boolean,
};
