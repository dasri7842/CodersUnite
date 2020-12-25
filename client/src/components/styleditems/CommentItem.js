import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const CommentItem = ({ data }) => {
  return (
    <div className="m-4">
      <Link to={`/api/users/${data.author}`} className="text-link text-primary">
        <small> ~{data.author}</small>
      </Link>
      <small className="ml-3">
        <Moment fromNow>{data.time}</Moment>
      </small>
      <h3 className="mt-2">{data.content}</h3>
      <hr />
    </div>
  );
};

export default CommentItem;
