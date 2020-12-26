import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { connect } from "react-redux";

import { registerUser, loginUser } from "./../../actions/AuthActions";

const GoogleConnect = ({ registerUser, loginUser }) => {
  // This is not the correct way to do a google auth.
  // Every thing should be done in backend for security.
  // warning : password is completely open and it can be seen form DEV tools
  const responseGoogle = (response) => {
    if (!response.profileObj) return;
    const { email, googleId, givenName } = response.profileObj;
    axios
      .get("/api/users/validateemail", {
        headers: { email },
      })
      .then((res) => {
        if (!res.data) {
          // sign up
          const Form = {
            username: givenName + googleId.substring(1, 4),
            email,
            password: googleId,
          };
          registerUser(JSON.stringify(Form));
        } else {
          const Form = {
            username: givenName + googleId.substring(1, 4),
            password: googleId,
          };
          loginUser(JSON.stringify(Form));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <GoogleLogin
      className="m-4 text-center"
      buttonText="Connect using Google"
      clientId=""
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default connect(null, { registerUser, loginUser })(GoogleConnect);
