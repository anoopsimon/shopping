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
import jwt_decode from "jwt-decode";

function App() {
  const [authLoading, setAuthLoading,isTokenValid] = useState(true);

  useEffect(() => {
    const token = getToken();
    console.log('token is '  + token);
    let isTokenValid=false;
    if (!token) {
      return;
    }

    try {
     //let token = localStorage.getItem(TOKEN);
    let decodedToken = jwt_decode(token);    
    console.log("Decoded Token", decodedToken);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      isTokenValid=false;
    } else {
      console.log("Valid token");
      isTokenValid = true;
      setAuthLoading(false);
    }
    } catch (error) {
      isTokenValid=false;
      setAuthLoading(false);

    }

    
  });



  if (authLoading && isTokenValid) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <Container>
      <BrowserRouter>
        <div>
          <Navbar bg="primary" expand="lg" variant="dark">
            <Navbar.Brand href="#home">Shopping</Navbar.Brand>
            <NavLink className="navLink" exact activeClassName="active" to="/">
              Home
            </NavLink>
            <NavLink className="navLink" activeClassName="active" to="/login">
              Login
            </NavLink>
            <NavLink
              className="navLink"
              activeClassName="active"
              to="/dashboard"
            >
              Products
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
               
              </Form>
              {!isTokenValid ? <Button  style={{marginLeft:'50%'}}>Logout</Button> : <p>s</p>}
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
