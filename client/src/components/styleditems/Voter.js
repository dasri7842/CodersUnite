import { Toggle_modal } from "./../../actions/ToggleActions";
import { DoVote } from "./../../actions/PostActions";
import { connect } from "react-redux";

const Voter = ({ votes, DoVote, id, auth, Toggle_modal, voteNo }) => {
  // const [voteNo, SetvoteNo] = useState(auth.user?.activity?.[id] || 0); //  -1 -->downvote  0 -->novote 1 -->upvote
  const handleVote = (inc) => {
    if (!auth.isAuthenticated) Toggle_modal();
  };
  return (
    <div className="text-center mr-1">
      <button
        className={`btn-none text-secondary text-${
          voteNo === 1 ? "info" : "primary"
        }`}
        onClick={() => {
          handleVote(1);
        }}
      >
        <i className="fa fa-arrow-up fa-2x" aria-hidden="true"></i>
      </button>
      <h2 className="display-5 m-1">{votes}</h2>
      <button
        className={`btn-none text-secondary text-${
          voteNo === -1 ? "info" : "primary"
        }`}
        onClick={() => handleVote(-1)}
      >
        <i className="fa fa-arrow-down fa-2x" aria-hidden="true"></i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  Toggle_modal,
  DoVote,
})(Voter);
