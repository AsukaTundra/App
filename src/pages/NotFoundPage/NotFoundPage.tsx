import React from "react";

import ErrorAlert from "../../components/error";

const NotFoundPage: React.FC = () => {
  return <ErrorAlert error={"Not Found"} />;
};

export default NotFoundPage;
