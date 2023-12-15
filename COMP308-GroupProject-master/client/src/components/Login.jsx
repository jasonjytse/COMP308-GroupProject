import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';

// Define the LOGIN_NURSE mutation
const LOGIN_NURSE = gql`
  mutation LoginNurse($nurseId: String!, $password: String!) {
    nurseLogin(nurseId: $nurseId, password: $password) {
      nurseId
      firstName
      lastName
    }
  }
`;

// Define the LOGIN_PATIENT mutation
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

  const [loginNurse, { loading: loadingNurse, error: errorNurse }] = useMutation(LOGIN_NURSE);
  const [loginPatient, { loading: loadingPatient, error: errorPatient }] = useMutation(LOGIN_PATIENT);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = loginType === 'nurse' 
        ? await loginNurse({ variables: { nurseId: username, password } }) 
        : await loginPatient({ variables: { patientId: username, password } });

      console.log(`${loginType} login successful:`, response.data);
      // Redirect or show success message
    } catch (error) {
      console.error(`${loginType} login error:`, error);
      // Show error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        {/* Login Type Selector */}
        <Form.Group>
          <Form.Label>Login Type:</Form.Label>
          <Form.Control as="select" value={loginType} onChange={(e) => setLoginType(e.target.value)}>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
          </Form.Control>
        </Form.Group>

        {/* Username Field */}
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loadingNurse || loadingPatient}>
          Login
        </Button>

        {/* Display errors if they occur */}
        {errorNurse && <p>Error in nurse login: {errorNurse.message}</p>}
        {errorPatient && <p>Error in patient login: {errorPatient.message}</p>}
      </Form>
    </div>
  );
}

export default Login;
