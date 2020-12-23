import React, { useState } from "react";
import { connect } from "react-redux";
// import defaultDp from "./../../images/defaultDp.png";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { update_profile } from "./../../actions/ProfileActions";
const EditProfile = ({ profile, update_profile }) => {
  const { username, email, info } = profile.profile;
  // const [Profileimg, setProfileimg] = useState(defaultDp);
  const [Profileform, setProfileform] = useState({
    fullname: info ? info.fullname : "",
    bio: info ? info.bio : "",
    college: info ? info.college : "",
  });

  const handleChange = (e) => {
    setProfileform({
      ...Profileform,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = {
      username,
      info: Profileform,
    };
    update_profile(JSON.stringify(formdata));
  };

  return (
    <Form className="col-lg-6 mx-auto">
      <FormGroup>
        <Label className="text-info display-4">{username}</Label>
        <br />
        <Label className="text-muted display-5">{email}</Label>
      </FormGroup>
      <hr />

      <FormGroup>
        <Label>Full Name</Label>
        <Input
          type="text"
          name="fullname"
          value={Profileform.fullname}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Bio</Label>
        <Input
          type="textarea"
          name="bio"
          value={Profileform.bio}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>college</Label>
        <Input
          type="text"
          name="college"
          value={Profileform.college}
          onChange={handleChange}
        />
      </FormGroup>

      <Button onClick={handleSubmit} className="mt-2">
        Save Changes
      </Button>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { update_profile })(EditProfile);

// const handleChange = (e) => {
//   if (!e.target.files[0]) return;
//   var reader = new FileReader();
//   reader.onload = () => {
//     if (reader.readyState === 2) setProfileimg(reader.result);
//   };
//   reader.readAsDataURL(e.target.files[0]);
// };

// {/* <div className="row my-3">
//         <div className="col-sm-3 text-center m-auto">
//           <img
//             src={Profileimg}
//             className="rounded img-fluid"
//             alt="defaultDp"
//             width="200px"
//             height="200px"
//           />
//         </div>
//         <div className="col-sm-9  mt-auto">
//           <FormGroup>
//             <Label for="exampleFile"> Add a Profile Pic</Label>
//             <Input
//               type="file"
//               name="profilepic"
//               accept="image/*"
//               onChange={handleChange}
//             />
//           </FormGroup>
//         </div>
//       </div>
//       <hr /> */}
