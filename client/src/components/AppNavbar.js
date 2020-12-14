import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  Container,
} from "reactstrap";

const AppNavbar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="navbar">
      <Navbar color="dark" dark expand="sm" className="mb-5 fixed-top">
        <Container>
          <NavbarBrand className="mr-auto" tag={Link} to="/">
            True Coder
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav className="ml-auto" navbar>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
              <NavLink tag={Link} to="/api/posts">
                Feed
              </NavLink>
              <NavLink
                tag={Link}
                to={{
                  pathname: "/api/posts/newpost",
                  state: {
                    id: "",
                    title: "",
                    body: "",
                    snippet: "",
                    isUpdated: false,
                  },
                }}
              >
                New Post
              </NavLink>
              <NavLink tag={Link} to="/about">
                About
              </NavLink>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
