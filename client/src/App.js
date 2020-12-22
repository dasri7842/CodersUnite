import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import AddPost from "./components/AddPost";
import Allposts from "./components/AllPosts";
import SinglePost from "./components/SinglePost";
import About from "./components/About";
import Home from "./components/Home";
import AppFooter from "./components/AppFooter";
import Register from "./components/Register";
import Profile from "./components/profile/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";
import { loadUser } from "./actions/AuthActions";
import { useEffect } from "react";
import store from "./store/store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Router>
      <div className="App">
        <Register />
        <div className="content">
          <AppNavbar />
          <Container>
            <Switch>
              <Route path="/api/posts/newpost" component={AddPost} />
              <Route path="/api/posts/:id" exact component={SinglePost} />
              <Route path="/api/posts" component={Allposts} />
              <Route path="/api/users/:username" exact component={Profile} />
              <Route path="/about" component={About} />
              <Route path="/" component={Home} />
            </Switch>
          </Container>
        </div>
        <div className="foot">
          <AppFooter />
        </div>
      </div>
    </Router>
  );
}

export default App;
