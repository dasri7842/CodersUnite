import { Redirect, Link } from "react-router-dom";
import { DeletePost } from "./../actions/PostActions";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
const SinglePost = ({ match, DeletePost, post, user }) => {
  const [blogpost, setBlogpost] = useState({});
  const [delpost, setDelpost] = useState(false);

  useEffect(() => {
    setBlogpost(post.posts.find((data) => data._id === match.params.id));
  }, [match.params.id, post.posts]);

  const handleDelete = () => {
    DeletePost(match.params.id);
    setDelpost(true);
  };

  if (delpost) return <Redirect to="/api/posts" />;
  return (
    <div className="PersonInfo">
      {blogpost ? (
        <div className="singlepost">
          <Link
            to={`/api/users/${blogpost.author}`}
            className="text-link text-primary"
          >
            <small style={{ float: "right" }}> ~{blogpost.author}</small>
          </Link>
          <h1>{blogpost.title}</h1>
          <p className="my-4">{blogpost.body}</p>
          <h4>{blogpost.snippet}</h4>

          {user && user.username === blogpost.author ? (
            <div>
              <Link
                to={{
                  pathname: "/api/posts/newpost",
                  state: {
                    id: blogpost._id,
                    title: blogpost.title,
                    body: blogpost.body,
                    snippet: blogpost.snippet,
                    isUpdated: true,
                  },
                }}
              >
                <button className=" btn btn-dark m-1">
                  <i className="fa fa-pencil"></i> EDIT
                </button>
              </Link>
              <button className=" btn btn-danger m-1" onClick={handleDelete}>
                <i className="fa fa-trash"></i> DELETE
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  post: state.post,
  user: state.auth.user,
});
export default connect(mapStateToProps, { DeletePost })(SinglePost);
