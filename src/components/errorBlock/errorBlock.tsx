import React from "react";

import type { PropsErrorBlock } from "../../types/typesComponents";

import style from "./errorBlock.module.scss";

export const ErrorBlock: React.FC<PropsErrorBlock> = ({ error }) => {
  return (
    <div className={style.div}>
      <p className={style.p}>{error}</p>
    </div>
  );
};
