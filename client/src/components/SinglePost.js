import { Redirect } from "react-router-dom";
import { DeletePost, GetPost, Addcomment } from "./../actions/PostActions";
import { useState, useEffect } from "react";
import { Toggle_modal } from "./../actions/ToggleActions";
import { connect } from "react-redux";
import Loader from "./Loader";
import CommentItem from "./styleditems/CommentItem";
import FullSinglePost from "./styleditems/FullSinglePost";
import { Button, FormGroup, Input } from "reactstrap";

const SinglePost = ({
  match,
  isauth,
  DeletePost,
  post,
  user,
  GetPost,
  Toggle_modal,
  isloading,
  Addcomment,
}) => {
  const [delpost, setDelpost] = useState(false);
  const [comment, setcomment] = useState("");

  useEffect(() => {
    GetPost(match.params.id);
  }, [match.params.id, GetPost]);

  const handleAddcomment = (e) => {
    if (!isauth) Toggle_modal();
    else {
      e.preventDefault();
      const data = { content: comment, author: user.username };
      if (comment.length) Addcomment(match.params.id, JSON.stringify(data));
      setcomment("");
    }
  };

  const handleDelete = () => {
    DeletePost(match.params.id);
    setDelpost(true);
  };

  const comments = post?.comments?.map((data, id) => (
    <CommentItem data={data} key={id} />
  ));

  if (delpost) return <Redirect to="/api/posts" />;

  return (
    <div className="PersonInfo">
      {!isloading ? (
        <div>
          <div className="d-flex">
            <FullSinglePost
              handleDelete={handleDelete}
              post={post}
              user={user}
            />
          </div>

          <hr className="my-5" />

          <div className="container row ml-2">
            <FormGroup className="col-9">
              <Input
                type="textarea"
                name="body"
                rows={2}
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                placeholder="Add a comment here..."
              />
            </FormGroup>
            <FormGroup className="m-auto col-3">
              <Button className="rounded p-1 " onClick={handleAddcomment}>
                <i className="fa fa-send-o"> Post </i>
              </Button>
            </FormGroup>
          </div>

          <hr className="my-3" />
          <div>{post.comments?.length} comments</div>
          {comments?.reverse()}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  post: state.post.onePost,
  isloading: state.post.loading,
  user: state.auth.user,
  isauth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  DeletePost,
  Toggle_modal,
  Addcomment,
  GetPost,
})(SinglePost);
