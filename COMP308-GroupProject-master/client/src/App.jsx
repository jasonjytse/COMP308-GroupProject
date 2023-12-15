import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
import client from './apolloClient'; 

import Login from './components/Login';
import Registration from './components/Registration';
// import View from './components/View';
import Home from './components/Home';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="home">Your App Name</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/registration">Registration</Nav.Link>
                {/* <Nav.Link as={Link} to="/view">View</Nav.Link> */}
                {/* Add more navigation links as needed */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            {/* <Route path="view" element={<View />} /> */}
            {/* Add more routes for other components/pages */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
