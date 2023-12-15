import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';

import Button from 'react-bootstrap/Button';

const ADD_NURSE = gql`
  mutation AddNurse($nurseId: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addNurse(nurseId: $nurseId, password: $password, firstName: $firstName, lastName: $lastName) {
      nurseId
      firstName
      lastName
    }
  }
`;

function Nurse() {
  // State for nurse details
  const [nurseDetails, setNurseDetails] = useState({
    nurseId: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const [addNurse, { data, loading, error }] = useMutation(ADD_NURSE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNurseDetails({ ...nurseDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { nurseId, password, firstName, lastName } = nurseDetails;
      await addNurse({ variables: { nurseId, password, firstName, lastName } });

      // After successful registration, you can redirect to the login page using Link
      history.push('/login'); // Assuming you have access to the history object

      // Alternatively, you can show a success message with a link to login
      setRegistrationSuccess(true);

    } catch (err) {
      // Handle error
    }
  };


  // Render
  return (
    <div>
      <h2>Nurse Registration</h2>
      <Form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <Form.Group>
          <Form.Label>Nurse ID</Form.Label>
          <Form.Control
            type="text"
            name="nurseId"
            value={nurseDetails.nurseId}
            onChange={handleInputChange}
          />
        </Form.Group>
        {/* Other fields for password, firstName, lastName */}
        {/* ... */}
        <Button type="submit">Register</Button>
      </Form>
      {loading && <p>Registering...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Registration Successful</p>}
    </div>
  );
}

export default Nurse;
