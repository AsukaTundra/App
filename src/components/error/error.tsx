import React from "react";

import style from "./error.module.scss";

interface PropsErrorAlert {
  error: string;
}

const ErrorAlert: React.FC<PropsErrorAlert> = ({ error }) => {
  return (
    <div className={style.div}>
      <p className={style.p}>{error}</p>
    </div>
  );
};

export default ErrorAlert;
