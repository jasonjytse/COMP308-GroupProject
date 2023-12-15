import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function View({ screen, role, id, setScreen, setRole }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement the logout logic here, which should clear user authentication state
        // and navigate the user to the login page or home page.

        // Example of clearing user data and navigating to the login page:
        setScreen('auth');
        setRole('auth');
        navigate('/login');
    };

    return (
        <div className="view-container">
            <Typography variant="h4" gutterBottom>
                Welcome, {screen}!
            </Typography>
            <Typography variant="body1" paragraph>
                Your role: {role}
            </Typography>
            <Typography variant="body1" paragraph>
                Your ID: {id}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    );
}

View.propTypes = {
    screen: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    setScreen: PropTypes.func.isRequired,
    setRole: PropTypes.func.isRequired,
};

export default View;