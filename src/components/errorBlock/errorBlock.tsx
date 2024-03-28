import React from "react";

import style from "./errorBlock.module.scss";

type PropsErrorBlock = {
  error: string,
};

export const ErrorBlock: React.FC<PropsErrorBlock> = ({ error }) => {
  return (
    <div className={style.div}>
      <p className={style.p}>{error}</p>
    </div>
  );
};
