import React, { useEffect } from "react";
import AllPosts from "./../AllPosts";
import { connect } from "react-redux";
import defaultDp from "./../../images/defaultDp.png";
import EditProfile from "./EditProfile";
import { Button } from "reactstrap";
import Loader from "./../Loader";
import { get_profile, edit_profile } from "./../../actions/ProfileActions";
const Profile = ({ match, auth, profile, get_profile, edit_profile }) => {
  useEffect(() => {
    get_profile(match.params.username);
  }, [get_profile, match.params.username]);

  if (profile.isLoading) return <Loader />;
  if (profile.isEditing) return <EditProfile />;
  return (
    <div>
      <div className="row">
        <div className="col-sm-3 text-center m-auto">
          <img
            src={defaultDp}
            className="rounded img-fluid"
            alt="defaultDp"
            width="200px"
            height="200px"
          />
        </div>
        <div className="col-sm-9">
          {match.params.username === auth.user?.username ? (
            <Button
              style={{ float: "right" }}
              color="light"
              onClick={() => edit_profile()}
            >
              <i className="fa fa-pencil" />
            </Button>
          ) : null}
          <div className="text-danger display-5">
            {profile.profile?.username}
          </div>
          <div className="text-info display-4">
            {profile.profile?.info?.fullname}
          </div>

          <div className="text-muted display-5">{profile.profile?.email}</div>
          <div className="text-muted text-truncate display-5">
            Bio : {profile.profile?.info?.bio}
          </div>
          <div className="text-muted text-truncate display-5">
            College : {profile.profile?.info?.college}
          </div>
        </div>
      </div>
      <hr />
      <h2 className="text-muted m-4">Posts of {match.params.username}</h2>
      <AllPosts author={match.params.username} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { get_profile, edit_profile })(Profile);
