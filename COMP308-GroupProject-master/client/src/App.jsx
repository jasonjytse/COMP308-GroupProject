import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            Patient Repository
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
              <Nav.Link as={Link} to="/vitals">
                Enter Vitals
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="App">
        {/* Navigation Header */}
        {/* You can add a navigation header here if needed */}
        <Routes>
          <Route exact path="/" component={<Home />} />

          <Route path="/login" component={<Login />} />

          <Route path="/signup" component={<Registration />} />

          <Route render={() => <div>404 Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
