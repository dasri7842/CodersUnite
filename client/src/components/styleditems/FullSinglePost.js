import React from "react";
import { Link } from "react-router-dom";

const FullSinglePost = ({ post, user, handleDelete }) => {
  return (
    <div className="singlepost">
      <Link to={`/api/users/${post.author}`} className="text-link text-primary">
        <small style={{ float: "right" }}> ~{post.author}</small>
      </Link>

      <h3>{post.title}</h3>
      <p className="my-4">{post.body}</p>
      <h6>{post.snippet}</h6>

      {user && user.username === post.author ? (
        <div>
          <Link
            to={{
              pathname: "/api/posts/newpost",
              state: {
                id: post._id,
                title: post.title,
                body: post.body,
                snippet: post.snippet,
                isUpdated: true,
              },
            }}
          >
            <button className="btn btn-dark m-1">
              <i className="fa fa-pencil"></i>
            </button>
          </Link>
          <button className=" btn btn-danger m-1" onClick={handleDelete}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default FullSinglePost;
