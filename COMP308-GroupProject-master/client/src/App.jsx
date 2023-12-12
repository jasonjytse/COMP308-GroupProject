import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Header */}
        {/* You can add a navigation header here if needed */}
        <Switch>
          {/* Home Page */}
          <Route exact path="/" component={Home} />
          
          {/* Login Page */}
          <Route path="/login" component={Login} />

          {/* Registration Page */}
          <Route path="/register" component={Registration} />
          
          {/* Add more routes as needed */}
          
          {/* Default Route (404 Page) */}
          <Route render={() => <div>404 Page Not Found</div>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
