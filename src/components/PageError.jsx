import React from "react";
import { Link } from "react-router-dom";

const PageError = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to="/">Return to Main Page</Link>
    </div>
  );
};

export default PageError;
