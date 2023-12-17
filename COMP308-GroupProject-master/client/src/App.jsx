import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import { ApolloClient, InMemoryCache } from '@apollo/client'; // Import ApolloClient and InMemoryCache

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';

import Nurse from './components/Nurse';
import Patient from './components/Patient';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}> {/* Wrap the entire app with ApolloProvider */}
      <Router>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/home">Health monitor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/registration">Registration</Nav.Link>
                <Nav.Link as={Link} to="/nurse">Nurse Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/patient">Patient Dashboard</Nav.Link>
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
            <Route path="nurse" element={<Nurse />} /> 
            <Route path="patient" element={<Patient />} />
            {/* Add more routes for other components/pages */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
