import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './login.css';

import View from './View';

// GraphQL mutation for user login
const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      username
      role
      id
    }
  }
`;

function Login() {
    let navigate = useNavigate();
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
    const [screen, setScreen] = useState('auth');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const { data } = await loginUser({
                variables: { username, password },
            });

            // Check if login was successful
            if (data.loginUser) {
                setScreen(data.loginUser.username);
                setRole(data.loginUser.role);
                setId(data.loginUser.id);

                // Redirect to the appropriate page based on role
                if (data.loginUser.role === 'nurse') {
                    navigate('/nurse-dashboard');
                } else if (data.loginUser.role === 'patient') {
                    navigate('/patient-dashboard');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            // Display error message to the user
        }
    };

    return (
        <div className="entryform">
            {loading ? (
                <p>Loading...</p>
            ) : screen !== 'auth' ? (
                <View screen={screen} setScreen={setScreen} role={role} setRole={setRole} id={id} />
            ) : (
                <Form onSubmit={handleLogin}>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            placeholder="Username"
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password"
                            required
                        />
                    </Form.Group>

                    <Button size="lg" variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            )}
        </div>
    );
}

export default Login;