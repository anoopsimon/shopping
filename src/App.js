import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Home from "./Home";

import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, removeUserSession, setUserSession } from "./Utils/Common";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:4000/healthcheck`)
      .then((response) => {
        setUserSession(response.data.accessToken);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <Container>
      <BrowserRouter>
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Shopping</Navbar.Brand>
            <NavLink className ="navLink" exact activeClassName="active" to="/">Home</NavLink>
            <NavLink className ="navLink"activeClassName="active" to="/login">Login</NavLink>
            <NavLink className ="navLink" activeClassName="active" to="/dashboard">Dashboard</NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
            
          </Navbar>

          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </Container>
  );
}

export default App;
