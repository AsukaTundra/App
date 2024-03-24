import React from "react";
import { Spin } from "antd";

import style from "./loader.module.scss";

export const Loader: React.FC = () => {
  return (
    <div className={style.div}>
      <Spin className={style.spin} size="large" />
    </div>
  );
};
