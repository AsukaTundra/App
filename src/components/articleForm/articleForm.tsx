import React, { useState } from "react";
import { useForm } from "react-hook-form";

import type { ArticleFormProps, ArticleFormValues } from "../../types/typesComponents";

import style from "./articleForm.module.scss";

const ArticleForm: React.FC<ArticleFormProps> = ({ funcRequest }) => {
  const [count, setCount] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteTagsCount: (event: any) => void = (event) => {
    const parentDiv = event.target.parentElement;
    parentDiv.remove();
  };

  const addTagsCount = () => {
    const newInput = document.querySelector(".templateInput")?.cloneNode(true);
    if (newInput) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add(`${style.buttonTags}`);
      deleteButton.type = "button";
      deleteButton.innerText = "Delete tag";
      deleteButton.addEventListener("click", (event) => deleteTagsCount(event));
      newInput.appendChild(deleteButton);
      const inputContainer = document.querySelector(".inputsContainer");
      inputContainer?.appendChild(newInput);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ArticleFormValues>({ mode: "onBlur" });

  const onSubmit = (data: ArticleFormValues) => {
    setCount(0);
    const tagsArray = [];
    const inputsArray = document.querySelectorAll("input");
    for (let i = 0; i < inputsArray.length; i++) {
      const input = inputsArray[i];
      if (i >= 2) {
        if (input.value.trim().includes(" ") || input.value.length > 20) {
          setCount(count + 1);
        } else if (input.value.length !== 0) {
          tagsArray.push(input.value.trim());
        }
      }
    }
    funcRequest({ ...data, tagList: [...tagsArray] });
  };

  return (
    <div className={style.articleForm}>
      <p className={style.title}>Create new article</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formContainer}>
          {/* title */}
          <label>
            <p className={style.inputTitle}>Title</p>
            <input
              className={`${style.input} ${errors.title ? style.redBorder : null}`}
              type="text"
              {...register("title", { required: "required" })}
              placeholder="Title"
            />
          </label>
          <div>{errors?.title && <p className={style.invalidText}>{errors.title.message}</p>}</div>
          {/* discription */}
          <label>
            <p className={style.inputTitle}>Short description</p>
            <input
              className={`${style.input} ${errors.description ? style.redBorder : null}`}
              type="text"
              {...register("description", { required: "required" })}
              placeholder="Title"
            />
          </label>
          <div>{errors?.description && <p className={style.invalidText}>{errors.description.message}</p>}</div>
          {/* body */}
          <label>
            <p className={style.inputTitle}>Text</p>
            <textarea
              className={`${style.input} ${style.inputTextarea} ${errors.body ? style.redBorder : null}`}
              {...register("body", { required: "required" })}
              placeholder="Text"
            />
          </label>
          <div>{errors?.body && <p className={style.invalidText}>{errors.body.message}</p>}</div>
          {/* tags */}
          <div className={`${style.tagsContainer} inputsContainer`}>
            <p className={style.inputTitle}>Tags</p>
            <button className={`${style.buttonTags} ${style.buttonAdd}`} type="button" onClick={() => addTagsCount()}>
              Add tag
            </button>
            <div className="templateInput">
              <input className={`${style.input} ${style.inputTags}`} type="text" placeholder="Tag" />
            </div>
          </div>

          {count ? (
            <div className={style.invalidTags}>
              <p className={style.invalidText}>
                Tags must not contain spaces or be longer than 20 characters. Fix it and send it again.
              </p>
            </div>
          ) : null}
          <button className={style.button} type="submit" onClick={() => handleSubmit(onSubmit)}>
            Sand
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
