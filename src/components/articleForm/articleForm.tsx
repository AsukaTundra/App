import React from "react";
import { useForm } from "react-hook-form";

import style from "./articleForm.module.scss";

interface FormArticleProps {
  funcRequest: (data: FormArticleValues) => void;
}

export type FormArticleValues = {
  title: string,
  description: string,
  body: string,
  tagList: string[],
};

const ArticleForm: React.FC<FormArticleProps> = ({ funcRequest }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteTagsCount: (event: any) => void = (event) => {
    const target = event.target;
    const parent = target.parentElement;
    parent.remove();
    console.log(parent);
  };

  const addTagsCount = () => {
    const container = document.querySelector(".template");
    const newContainer = container?.cloneNode(true);
    const tagsContainer = document.querySelector(".containerTags");
    if (newContainer) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add(`${style.buttonTags}`);
      deleteButton.type = "button";
      deleteButton.innerText = "Delete tag";
      deleteButton.addEventListener("click", (e) => deleteTagsCount(e));
      newContainer.appendChild(deleteButton);
      tagsContainer?.appendChild(newContainer);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormArticleValues>({ mode: "onBlur" });

  const onSubmit = (data: FormArticleValues) => {
    const tagsArray = [];
    const litle = document.querySelectorAll("input");
    for (let i = 0; i < litle.length; i++) {
      const q1 = litle[i];
      if (i >= 2) {
        tagsArray.push(q1.value);
      }
    }
    funcRequest({ ...data, tagList: [...tagsArray] });
  };

  return (
    <div className={style.articleForm}>
      <p className={style.title}>Create new article</p>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formContainer}>
          {/* title */}
          <label>
            <p className={style.text}>Title</p>
            <input
              className={`${style.inputText} ${errors.title ? style.redBorder : null}`}
              type="text"
              {...register("title", { required: "required" })}
              placeholder="Title"
            />
          </label>
          <div>{errors?.title && <p className={style.invalidText}>{errors.title.message}</p>}</div>
          {/* discription */}
          <label>
            <p className={style.text}>Short description</p>
            <input
              className={`${style.inputText} ${errors.description ? style.redBorder : null}`}
              type="text"
              {...register("description", { required: "required" })}
              placeholder="Title"
            />
          </label>
          <div>{errors?.description && <p className={style.invalidText}>{errors.description.message}</p>}</div>
          {/* body */}
          <label>
            <p className={style.text}>Text</p>
            <textarea
              className={`${style.inputText} ${style.inputBigText} ${errors.body ? style.redBorder : null}`}
              {...register("body", { required: "required" })}
              placeholder="Text"
            />
          </label>
          <div>{errors?.body && <p className={style.invalidText}>{errors.body.message}</p>}</div>
          {/* tags */}
          <div className={`${style.tagsContainer} containerTags`}>
            <p className={style.text}>Tags</p>
            <button className={`${style.buttonTags} ${style.blue}`} type="button" onClick={() => addTagsCount()}>
              Add tag
            </button>
            <div className="template">
              <input className={`${style.inputText} ${style.inputTags}`} type="text" placeholder="Tag" />
            </div>
          </div>
          <button className={style.button} type="submit" onClick={() => handleSubmit(onSubmit)}>
            Sand
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
