import React from "react";
import Error from "./Error";

const ServerError = () => {
  return (
    <Error
      message={
        "Oops, there was an error with the server. Please try again later."
      }
    />
  );
};

export default ServerError;
