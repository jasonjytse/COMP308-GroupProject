import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Header */}
        {/* You can add a navigation header here if needed */}
        
        {/* Routing */}
        <Switch>
          {/* Home Page */}
          <Route exact path="/" component={Home} />
          
          {/* Login Page */}
          <Route path="/login" component={Login} />

          {/* Registration Page */}
          <Route path="/register" component={RegistrationForm} />
          
          {/* Add more routes as needed */}
          
          {/* Default Route (404 Page) */}
          <Route render={() => <div>404 Page Not Found</div>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
