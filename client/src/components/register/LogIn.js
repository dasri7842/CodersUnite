import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Alert, Spinner } from "reactstrap";
import { loginUser } from "./../../actions/AuthActions";
import { clearErrors } from "./../../actions/ErrorActions";

const LogIn = ({ error, auth, loginUser, clearErrors }) => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    if (error.id === "LOGIN_FAIL") clearErrors();
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    const Form = {
      username: loginForm.username,
      password: loginForm.password,
    };
    loginUser(JSON.stringify(Form));
  };

  const logInBtn = (
    <Button color="success" className="mx-4 my-3 p-3">
      Log In
    </Button>
  );
  const loadingBtn = (
    <Button color="success" disabled className="mx-4 my-3 p-3">
      <span className="px-1">
        <Spinner color="light" />
      </span>
    </Button>
  );

  return (
    <form className="m-sm-6" onSubmit={handelsubmit}>
      {error.id === "LOGIN_FAIL" && error.msg ? (
        <Alert color="danger" className="mx-4 mt-4">
          <i className="fa fa-times mr-2" aria-hidden="true" />
          {error.msg}
        </Alert>
      ) : (
        <p className="p-4"></p>
      )}
      <div className="form">
        <div className="mx-4 mt-5 p-3">
          <i className="fa fa-user fa-2x"></i>
          <input
            type="text"
            name="username"
            autoComplete="username"
            placeholder="Your username or Email "
            onChange={handleChange}
            value={loginForm.email}
          />
        </div>

        <div className="mx-4 p-3">
          <i className="fa fa-lock fa-2x"></i>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Your Password"
            onChange={handleChange}
            value={loginForm.password}
          />
        </div>
      </div>
      <div className="logbtn">{auth.isLoading ? loadingBtn : logInBtn}</div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loginUser,
  clearErrors,
})(LogIn);
