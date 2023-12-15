import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const REGISTER_PATIENT = gql`
  mutation RegisterPatient($patientId: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addPatient(patientId: $patientId, password: $password, firstName: $firstName, lastName: $lastName) {
      patientId
      firstName
      lastName
    }
  }
`;

function Patient() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [registerPatient, { data, loading, error }] = useMutation(REGISTER_PATIENT);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerPatient({
        variables: {
          patientId: username,
          password,
          firstName,
          lastName,
        },
      });
      // Handle patient registration success or error
    } catch (err) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Patient Registration</h2>
      <Form onSubmit={handleRegistration}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      {loading && <p>Registering...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Registration Successful</p>}
    </div>
  );
}

export default Patient;
