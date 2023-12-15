import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

// import { makeStyles } from '@material-ui/core/styles';



import './Home.css'; // Import the CSS file

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  content: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  description: {
    fontSize: '1rem',
    marginBottom: '32px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  loginButton: {
    marginRight: '16px',
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={6} lg={4}>
        <div className={classes.content}>
          <Typography variant="h4" className={classes.heading} gutterBottom>
            Welcome to Health Monitor
          </Typography>
          <Typography variant="body1" className={classes.description} paragraph>
            Your trusted platform for health monitoring and management.
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              size="large"
              className={classes.loginButton}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              color="primary"
              size="large"
            >
              Register
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Home;
