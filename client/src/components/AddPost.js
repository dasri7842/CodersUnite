import { connect } from "react-redux";
import { useState } from "react";
import { AddPost as NewPost, UpdatePost } from "./../actions/PostActions";
import { Toggle_modal } from "./../actions/ToggleActions";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Container, Label, Input } from "reactstrap";
const AddPost = ({ location, NewPost, UpdatePost, auth, Toggle_modal }) => {
  // this is redirected from edit button . So Filled the intitial fields and take the action UPDATE_POST
  const { id, title, body, snippet, isUpdated } = location.state;
  const [postForm, setPostForm] = useState({
    id,
    title,
    body,
    snippet,
    redirect: false,
  });
  const [redirect, setRedirect] = useState(false);
  const handleChange = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  };
  const handelsubmit = (e) => {
    if (!auth.isAuthenticated) {
      Toggle_modal();
    } else {
      e.preventDefault();
      const post = {
        title: postForm.title,
        body: postForm.body,
        snippet: postForm.snippet,
        author: auth.user?.username,
      };
      if (isUpdated) {
        const updPost = { ...post, _id: postForm.id };
        UpdatePost(updPost);
      } else NewPost(post);
      setRedirect(true);
    }
  };
  if (redirect) return <Redirect to="/api/posts" />;
  return (
    <Container className="col-md-6 mx-auto">
      <Form className="m-6">
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            onChange={handleChange}
            value={postForm.title}
          />
        </FormGroup>
        <FormGroup>
          <Label>Body</Label>
          <Input
            type="textarea"
            name="body"
            rows={5}
            onChange={handleChange}
            value={postForm.body}
          />
        </FormGroup>
        <FormGroup>
          <Label>Snippet</Label>
          <Input
            type="text"
            name="snippet"
            onChange={handleChange}
            value={postForm.snippet}
          />
        </FormGroup>
        <Button onClick={handelsubmit}>Submit</Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { NewPost, UpdatePost, Toggle_modal })(
  AddPost
);
