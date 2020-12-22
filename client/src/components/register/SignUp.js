import React, { useState } from "react";
import Mybtn from "../styleditems/Mybtn";
import { registerUser } from "./../../actions/AuthActions";
import { connect } from "react-redux";
import Axios from "axios";
import { Spinner } from "reactstrap";

var userTimeout = null;
const SignUp = ({ error, auth, registerUser, clearErrors }) => {
  const [username, setUsername] = useState({ username: "", valid: 0 });
  const [email, setEmail] = useState({ email: "", valid: 0 });
  const [password, setPassword] = useState({ password: "", valid: 0 });

  const validate = [
    <i className="fa fa-nothing fa-2x"></i>, // 0 -> empty
    <i className="fa fa-check fa-2x text-success"></i>, // 1 -> valid
    <i className="fa fa-times fa-2x text-danger"></i>, // 2 -> invalid
    <i className="fa fa-nothing fa-2x text-danger">
      <Spinner color="dark" />
    </i>, // 3 -> loading
  ];

  const handleUN = (e) => {
    let data = e.target.value.toLowerCase();
    if (data.length < 3) {
      setUsername({ username: data, valid: 2 });
      return;
    }
    clearTimeout(userTimeout);
    userTimeout = setTimeout(() => {
      Axios.get("/api/users/validateuser", {
        headers: { username: data },
      })
        .then((res) => {
          if (res.data === true) setUsername({ username: data, valid: 2 });
          else setUsername({ username: data, valid: 1 });
        })
        .catch((err) => console.error(err));
    }, 2000);
    setUsername({ username: data, valid: 3 });
  };

  const handleEmail = (e) => {
    let data = e.target.value;
    if (!validateEmail(data)) {
      setEmail({ email: data, valid: 2 });
      return;
    }
    clearTimeout(userTimeout);
    userTimeout = setTimeout(() => {
      Axios.get("/api/users/validateemail", {
        headers: { email: data },
      })
        .then((res) => {
          if (res.data) setEmail({ email: data, valid: 2 });
          else setEmail({ email: data, valid: 1 });
        })
        .catch((err) => console.error(err));
    }, 1500);
    setEmail({ email: data, valid: 3 });
  };

  const handlePass = (e) => {
    if (e.target.value.length > 5)
      setPassword({ password: e.target.value, valid: 1 });
    else setPassword({ password: e.target.value, valid: 2 });
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    const Form = {
      username: username.username,
      email: email.email,
      password: password.password,
    };
    registerUser(JSON.stringify(Form));
  };

  const validateEmail = (email) => {
    //eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <form className="m-sm-6" onSubmit={handelsubmit}>
      <div className="form">
        <div className="mx-4 mt-5 p-3">
          <i className="fa fa-user fa-2x"></i>
          <input
            type="text"
            name="username"
            autoComplete="username"
            placeholder="Username (atleast 3 chars & unique)"
            onChange={handleUN}
            value={username.username}
          />
          {validate[username.valid]}
        </div>

        <div className="mx-4 p-3">
          <i className="fa fa-envelope fa-2x"></i>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your Email (Eg : abc@xyz.pq)"
            onChange={handleEmail}
            value={email.email}
          />
          {validate[email.valid]}
        </div>
        <div className="mx-4 p-3">
          <i className="fa fa-lock fa-2x"></i>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Your Password (atleast 6 chars)"
            onChange={handlePass}
            value={password.password}
          />
          {validate[password.valid]}
        </div>
      </div>
      <div className="logbtn">
        <Mybtn
          btname="Create an account"
          loading={auth.isLoading}
          disabled={
            !(username.valid === 1 && email.valid === 1 && password.valid === 1)
          }
        />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  registerUser,
})(SignUp);
