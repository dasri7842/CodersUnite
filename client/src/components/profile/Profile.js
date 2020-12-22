import React from "react";

const Profile = ({ match }) => {
  return (
    <div>
      <h1>This is the Profile of {match.params.username}</h1>
    </div>
  );
};

export default Profile;
