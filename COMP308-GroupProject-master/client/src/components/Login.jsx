import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';



import View from './View'

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
    const [role, setRole] = useState();
    const [id, setId] = useState();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const { data } = await loginUser({
                variables: { username, password }
            });

            setScreen(data.loginUser.username);
            setUsername('');
            setPassword('');
            setRole(data.loginUser.role);
            setId(data.loginUser.id);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                // Replace this with your actual logic to check if the user is logged in
                if (data) {
                    setScreen(data.loginUser.username);
                    setRole(data.loginUser.role);
                    setId(data.loginUser.id);
                }
            } catch (e) {
                setScreen('auth');
                setRole('auth');
                setId('auth');
                console.log('error: ', e);
            }
        };

        // You can use the checkLoginStatus function to check if the user is logged in.
        // Replace this logic with your actual authentication flow.
        checkLoginStatus();
    }, [data]);

    return (
        <div className="entryform">
            {screen !== 'auth' ? (
                <View screen={screen} setScreen={setScreen} role={role} setRole={setRole} id={id} />
            ) : (
                <Form onSubmit={handleLogin}>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control id="username" type="text" onChange={(event) => setUsername(event.target.value)} placeholder="Username" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control id="password" type="password" onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
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
