import React from "react";
import Error from "../errors/Error";

const ViolationError = () => {
  return (
    <Error
      message={
        "The query was found to violate the chat policy. Please provide another query."
      }
    />
  );
};

export default ViolationError;
