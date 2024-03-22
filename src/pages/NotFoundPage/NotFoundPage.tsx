import React from "react";

import ErrorBlock from "../../components/errorBlock";

const NotFoundPage: React.FC = () => {
  return <ErrorBlock error={"Not Found"} />;
};

export default NotFoundPage;
