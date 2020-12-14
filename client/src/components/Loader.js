import loader from "./../images/loader.gif";
import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="Loading"></img>
    </div>
  );
};

export default Loader;
