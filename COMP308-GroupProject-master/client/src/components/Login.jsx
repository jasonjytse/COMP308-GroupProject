import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';
import { LOGIN_NURSE, LOGIN_PATIENT } from '../graphql/mutations';
const LOGIN_NURSE = gql`
  mutation LoginNurse($nurseId: String!, $password: String!) {
    nurseLogin(nurseId: $nurseId, password: $password) {
      nurseId
      firstName
      lastName
    }
  }
`;

const LOGIN_PATIENT = gql`
  mutation LoginPatient($patientId: String!, $password: String!) {
    patientLogin(patientId: $patientId, password: $password) {
      patientId
      firstName
      lastName
    }
  }
`;

function Login() {
  const [loginType, setLoginType] = useState('nurse'); // Default to nurse login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginNurse] = useMutation(LOGIN_NURSE);
  const [loginPatient] = useMutation(LOGIN_PATIENT);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginType === 'nurse') {
      try {
        const { data } = await loginNurse({
          variables: {
            nurseId: username,
            password,
          },
        });
        // Handle nurse login success
        console.log('Nurse login successful:', data);
        // You can redirect the user to a different page or show a success message here
      } catch (error) {
        console.error('Nurse login error:', error);
        // Handle nurse login error, show an error message to the user
      }
    } else if (loginType === 'patient') {
      try {
        const { data } = await loginPatient({
          variables: {
            patientId: username,
            password,
          },
        });
        // Handle patient login success
        console.log('Patient login successful:', data);
        // You can redirect the user to a different page or show a success message here
      } catch (error) {
        console.error('Patient login error:', error);
        // Handle patient login error, show an error message to the user
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Login Type:</Form.Label>
          <Form.Control as="select" onChange={(e) => setLoginType(e.target.value)}>
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
