import List from "../components/list";

import "../assets/fonts/fonts.css";
import style from "./app.module.scss";

export default function App() {
  return (
    <>
      <header className={style.header}>
        <button className={style.title}>
          <p>Realworld Blog</p>
        </button>
        <button className={style.button}>
          <p>Sign In</p>
        </button>
        <button className={style.button}>
          <p>Sign Up</p>
        </button>
      </header>
      <List />
    </>
  );
}
