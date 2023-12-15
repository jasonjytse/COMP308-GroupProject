import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Registration() {
  const [registrationType, setRegistrationType] = useState('nurse'); // Default to nurse registration
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistration = (e) => {
    e.preventDefault();

    // You can handle registration logic here without GraphQL
    console.log('Registration form submitted with the following data:');
    console.log('Registration Type:', registrationType);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);

    // Set registration success to true to display a success message
    setRegistrationSuccess(true);
  };

  return (
    <div>
      <h2>Registration</h2>
      {registrationSuccess ? (
        <div className="success-message">Registration successful!</div>
      ) : (
        <Form onSubmit={handleRegistration}>
          <Form.Group>
            <Form.Label>Registration Type:</Form.Label>
            <Form.Control as="select" onChange={(e) => setRegistrationType(e.target.value)}>
              <option value="nurse">Nurse</option>
              <option value="patient">Patient</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Registration;
