import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import Moment from "react-moment";
import { FetchPosts } from "./../actions/PostActions";
import Loader from "./Loader";
const AllPosts = ({ FetchPosts, post, author }) => {
  useEffect(() => {
    FetchPosts(author);
  }, [FetchPosts, author]);

  const Allposts = post.posts.map((post) => (
    <div className="post col-md-8 mx-auto" key={post._id}>
      <Link to={`/api/users/${post.author}`} className="text-link text-primary">
        <small style={{ float: "right" }}> ~{post.author}</small>
      </Link>
      <h3 className="text-truncate mb-3">{post.title}</h3>
      <Link
        to={`/api/posts/${post._id}`}
        className="text-link"
        style={{ float: "right" }}
      >
        <Button size="sm">View</Button>
      </Link>
      <p>{post.snippet}</p>
      <hr className="m-1" />
      <div className="d-flex justify-content-around">
        <small>{post.views} views</small>
        {/* <small>{post?.votes} votes</small> */}
        <small>
          {post.comments.length} <i className="fa fa-comments-o"></i>
        </small>
        <small>
          <i className="fa fa-clock-o mx-2"></i>
          <Moment fromNow>{post.createdAt}</Moment>
        </small>
      </div>
    </div>
  ));
  if (post.loading) return <Loader />;
  return <div className="blogposts">{Allposts}</div>;
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { FetchPosts })(AllPosts);
