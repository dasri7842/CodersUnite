import { Toggle_modal } from "./../../actions/ToggleActions";
import { DoVote } from "./../../actions/PostActions";
import { connect } from "react-redux";

const Voter = ({ votes, DoVote, id, isauth, Toggle_modal }) => {
  const handleVote = (inc) => {
    if (!isauth) Toggle_modal();
    else {
      DoVote(id, JSON.stringify({ inc }));
    }
  };
  return (
    <div className="text-center mr-1">
      <button
        className="btn-none text-secondary"
        onClick={() => {
          handleVote(1);
        }}
      >
        <i className="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
      </button>
      <h2 className="display-5 m-1">{votes}</h2>
      <button
        className="btn-none text-secondary"
        onClick={() => handleVote(-1)}
      >
        <i className="fa fa-arrow-down fa-2x" aria-hidden="true"></i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isauth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  Toggle_modal,
  DoVote,
})(Voter);
