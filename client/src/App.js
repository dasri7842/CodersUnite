import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import AddPost from "./components/AddPost";
import Allposts from "./components/AllPosts";
import SinglePost from "./components/SinglePost";
import About from "./components/About";
import Home from "./components/Home";
import AppFooter from "./components/AppFooter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";
function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <AppNavbar />
          <Container>
            <Switch>
              <Route path="/api/posts/newpost" component={AddPost} />
              <Route path="/api/posts/:id" exact component={SinglePost} />
              <Route path="/api/posts" component={Allposts} />
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
