import style from "./article.module.scss";

export default function Article() {
  return (
    <div className={style.article}>
      <h2>Some article title</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur veritatis sit voluptate aperiam voluptatum illo
        cupiditate accusamus a molestias eius molestiae assumenda ex omnis consequatur eligendi dignissimos hic, id quisquam?
      </p>
    </div>
  );
}
