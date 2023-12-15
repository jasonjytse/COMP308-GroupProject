import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import RegistrationForm from "./components/Registration";
import Nav from 'react-bootstrap/Nav';
import './App.css';

import Home from './components/Home';
import Login from './components/Login';

import Nurse from './components/Nurse';
import Patient from './components/Patient';

function App() {
  const [screen, setScreen] = useState('auth'); // Initialize screen state with 'auth'

  return (
      <Router>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/home">Health Monitor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
                {/* Add other navigation links here */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/login">
              {screen === 'auth' ? (
                  <Login setScreen={setScreen} />
              ) : (
                  <Redirect to={`/${screen}`} />
              )}
            </Route>
            <Route path="/signup" component={RegistrationForm} />
            <Route path="/nurse" component={Nurse} />
            <Route path="/patient" component={Patient} />
            <Route path="*">
              <div>404 Page Not Found</div>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;