import { Modal } from "reactstrap";
import GoogleLogin from "react-google-login";
import LogIn from "./register/LogIn";
import { Toggle_Foucs, Toggle_modal } from "./../actions/ToggleActions";
import { connect } from "react-redux";
import SignUp from "./register/SignUp";
const Register = ({ Toggle, Toggle_modal, Toggle_Foucs }) => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  const externalCloseBtn = (
    <button
      className="close text-light"
      style={{ position: "absolute", top: "15px", right: "15px" }}
      onClick={Toggle_modal}
    >
      <i class="fa fa-times fa-2x" aria-hidden="true" />
    </button>
  );

  return (
    <Modal
      isOpen={Toggle.modal}
      toggle={Toggle_modal}
      centered
      backdrop="static"
      external={externalCloseBtn}
      color="white"
    >
      <div className="loginmodal">
        <div className="logToggler">
          <button
            style={signupStyle[Toggle.focus * 1]}
            onClick={() => Toggle_Foucs(true)}
          >
            <h2>Sign Up</h2>
          </button>
          <button
            style={logInstyle[Toggle.focus * 1]}
            onClick={() => Toggle_Foucs(false)}
          >
            <h2>Log In</h2>
          </button>
        </div>
        {Toggle.focus ? <SignUp /> : <LogIn />}
        <div className="row lines">
          <div className="col-4"></div>
          <h3 className="text-white mx-4">OR</h3>
          <div className="col-4"></div>
        </div>
        <div className="row lines">
          <GoogleLogin
            className="m-4 text-center"
            buttonText="Connect using Google"
            clientId=""
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </Modal>
  );
};

const signupStyle = [
  { boxShadow: "#343a40 -4px -4px 10px 0px inset" },
  { backgroundColor: "#343a40", color: "white" },
];
const logInstyle = [
  { backgroundColor: "#343a40", color: "white" },
  { boxShadow: "#343a40 4px -4px 10px 0px inset" },
];

const mapStateToProps = (state) => ({
  Toggle: state.Toggle,
});
export default connect(mapStateToProps, { Toggle_modal, Toggle_Foucs })(
  Register
);
