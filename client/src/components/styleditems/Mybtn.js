import React from "react";
import { Button, Spinner } from "reactstrap";

const Mybtn = ({ btname, loading, disabled }) => {
  return (
    <Button
      color="success"
      disabled={disabled || loading}
      className="mx-4 my-3 p-3"
    >
      {loading === true ? (
        <span className="px-5">
          <Spinner color="light" />
        </span>
      ) : (
        <span>{btname}</span>
      )}
    </Button>
  );
};

export default Mybtn;
