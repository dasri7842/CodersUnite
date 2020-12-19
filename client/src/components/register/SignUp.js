import React, { useState } from "react";
import { Button, Alert, Spinner } from "reactstrap";
import { registerUser } from "./../../actions/AuthActions";
import { clearErrors } from "./../../actions/ErrorActions";
import { connect } from "react-redux";

const SignUp = ({ error, auth, registerUser, clearErrors }) => {
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    if (error.id === "REGISTER_FAIL") clearErrors();
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    const Form = {
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password,
    };
    registerUser(JSON.stringify(Form));
  };

  const logInBtn = (
    <Button color="success" className="mx-4 my-3 p-3">
      Create an Account
    </Button>
  );
  const loadingBtn = (
    <Button color="success" disabled className="mx-4 my-3 p-3">
      <span className="px-5">
        <Spinner color="light" />
      </span>{" "}
    </Button>
  );

  return (
    <form className="m-sm-6" onSubmit={handelsubmit}>
      {error.id === "REGISTER_FAIL" && error.msg ? (
        <Alert color="danger" className="mx-4 mt-4">
          <i className="fa fa-times mr-2" aria-hidden="true" />
          {error.msg}
        </Alert>
      ) : (
        <p className="p-4"></p>
      )}

      <div className="form">
        <div className="mx-4 mt-4 p-3">
          <i className="fa fa-user fa-2x"></i>
          <input
            type="text"
            name="name"
            autoComplete="username"
            placeholder="First and last name"
            onChange={handleChange}
            value={signupForm.name}
          />
        </div>

        <div className="mx-4 p-3">
          <i className="fa fa-envelope fa-2x"></i>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            onChange={handleChange}
            value={signupForm.email}
          />
        </div>
        <div className="mx-4 p-3">
          <i className="fa fa-lock fa-2x"></i>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Your Password"
            onChange={handleChange}
            value={signupForm.password}
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
  registerUser,
  clearErrors,
})(SignUp);
