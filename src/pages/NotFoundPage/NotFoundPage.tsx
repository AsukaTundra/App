import React from "react";

import ErrorBlock from "../../components/errorBlock";

export const NotFoundPage: React.FC = () => {
  return <ErrorBlock error={"Not Found"} />;
};
