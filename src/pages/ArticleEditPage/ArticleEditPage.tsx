import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import type { ArticleFormValues } from "../../components/articleForm/articleForm.tsx";
import { getArticle, updateArticle } from "../../store/blogSlice.ts";
import { useAppDispatch, useNav } from "../../hooks/hooks.ts";
import ArticleForm from "../../components/articleForm";

export const ArticleEditPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const slug = useParams();
  const navigate = useNav();

  useEffect(() => {
    if (slug.slug) dispatch(getArticle(slug.slug));
  }, [slug.slug]);

  const funcRequest: (form: ArticleFormValues) => void = (form) => {
    dispatch(
      updateArticle({
        article: { title: form.title, description: form.description, body: form.body },
        slug: slug.slug || "",
        token: document.cookie.split("=")[1],
      })
    );
    setTimeout(() => navigate(`/article/${slug.slug}`), 600);
  };

  return <ArticleForm funcRequest={funcRequest} editing={true} />;
};
