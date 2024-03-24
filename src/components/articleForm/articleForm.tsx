import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type { ArticleFormProps, ArticleFormValues } from "../../types/typesComponents";
import { useAppSelector } from "../../hooks";

import style from "./articleForm.module.scss";

export const ArticleForm: React.FC<ArticleFormProps> = ({ funcRequest, articleEdit }) => {
  const articleState = useAppSelector((state) => state.blog.articles.article);
  const [invalidTagCount, setInvalidTagCount] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteTags: (event: any) => void = (event) => {
    console.log(2);
    const parentDiv = event.target.parentElement;
    parentDiv.remove();
  };

  console.log(1);
  // creating new tags input
  const addTags = (cycle: number, arrayValues?: string[]) => {
    const inputContainer = document.querySelector(".inputsContainer");
    for (let i = 0; i < cycle; i++) {
      const inputText = document.createElement("input");
      inputText.classList.add(`${style.input}`);
      inputText.classList.add(`${style.inputTags}`);
      inputText.setAttribute("placeholder", "Tag");
      inputText.setAttribute("value", `${arrayValues ? arrayValues[i] : ""}`);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add(`${style.buttonTags}`);
      deleteButton.type = "button";
      deleteButton.innerText = "Delete tag";
      deleteButton.addEventListener("click", (event) => deleteTags(event));

      const div = document.createElement("div");
      div.appendChild(inputText);
      div.appendChild(deleteButton);

      inputContainer?.appendChild(div);
    }
  };

  useEffect(() => {
    if (articleState && articleEdit) {
      addTags(articleState?.tagList.length, articleState.tagList);
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ArticleFormValues>({ mode: "onBlur" });

  // checking the validity of tags
  const onSubmit = (data: ArticleFormValues) => {
    setInvalidTagCount(0);
    const tagsArray = [];
    const inputsArray = document.querySelectorAll("input");
    for (let i = 0; i < inputsArray.length; i++) {
      const input = inputsArray[i];
      if (i >= 2) {
        if (input.value.trim().includes(" ") || input.value.length > 20) {
          setInvalidTagCount(invalidTagCount + 1);
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
              defaultValue={articleEdit ? articleState?.title : ""}
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
              defaultValue={articleEdit ? articleState?.description : ""}
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
              defaultValue={articleEdit ? articleState?.body : ""}
            />
          </label>
          <div>{errors?.body && <p className={style.invalidText}>{errors.body.message}</p>}</div>

          {/* tags */}
          <div className={`${style.tagsContainer} inputsContainer`}>
            <p className={style.inputTitle}>Tags</p>
            <button className={`${style.buttonTags} ${style.buttonAdd}`} type="button" onClick={() => addTags(1)}>
              Add tag
            </button>
            <div className="templateInput">
              <input className={`${style.input} ${style.inputTags}`} type="text" placeholder="Tag" />
            </div>
          </div>

          {/* invalid tag warning */}
          {invalidTagCount ? (
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
