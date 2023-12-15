import React from 'react';
import '../css/Home.css';

function Home(props) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="text-center mb-4">Health Monitoring System</h1>
          <div className="card border-primary">
            <div className="card-body">
              <h4 className="card-title">Welcome to Health Monitor</h4>
              <p className="card-text">
                Monitor your health and vital signs with ease. Keep track of your daily activities and stay fit.
              </p>
              <a href="/dashboard" className="btn btn-primary">Go to Dashboard</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
