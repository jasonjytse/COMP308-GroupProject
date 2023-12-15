import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';

// Define your GraphQL mutations here, matching the schema
const REGISTER_NURSE = gql`
  mutation RegisterNurse($nurseId: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addNurse(nurseId: $nurseId, password: $password, firstName: $firstName, lastName: $lastName) {
      nurseId
      firstName
      lastName
    }
  }
`;

const REGISTER_PATIENT = gql`
  mutation RegisterPatient($patientId: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addPatient(patientId: $patientId, password: $password, firstName: $firstName, lastName: $lastName) {
      patientId
      firstName
      lastName
    }
  }
`;


function Registration() {
  const [registrationType, setRegistrationType] = useState('nurse'); // Default to nurse registration
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [registerNurse] = useMutation(REGISTER_NURSE);
  const [registerPatient] = useMutation(REGISTER_PATIENT);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const variables = registrationType === 'nurse' 
      ? { nurseId: username, password, firstName, lastName } 
      : { patientId: username, password, firstName, lastName };
  
    const action = registrationType === 'nurse' ? registerNurse : registerPatient;
  
    try {
      const { data } = await action({ variables });
      console.log(`${registrationType} registration successful:`, data);
      // Redirect or show success message
    } catch (error) {
      console.error(`${registrationType} registration error:`, error);
      // Show error message
    }
  };
  

  return (
    <div>
      <h2>Registration</h2>
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
    </div>
  );
}

export default Registration;
