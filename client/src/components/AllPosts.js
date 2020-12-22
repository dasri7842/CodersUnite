import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { FetchPosts } from "./../actions/PostActions";
import Loader from "./Loader";
const AllPosts = ({ FetchPosts, post }) => {
  useEffect(() => {
    FetchPosts();
  }, [FetchPosts]);
  const Allposts = post.posts.map((post) => (
    <div className="post col-md-8 mx-auto" key={post._id}>
      <Link to={`/api/users/${post.author}`} className="text-link text-primary">
        <small style={{ float: "right" }}> ~{post.author}</small>
      </Link>
      <Link to={`/api/posts/${post._id}`} className="text-link">
        <h3 className="text-truncate mb-3">{post.title}</h3>
      </Link>
      <p>{post.snippet}</p>
      <small>
        Last Edit : <Moment fromNow>{post.updatedAt}</Moment>
      </small>
      <small style={{ float: "right" }}>
        Posted : <Moment fromNow>{post.createdAt}</Moment>
      </small>
    </div>
  ));
  if (post.loading) return <Loader />;
  return <div className="blogposts">{Allposts}</div>;
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { FetchPosts })(AllPosts);
