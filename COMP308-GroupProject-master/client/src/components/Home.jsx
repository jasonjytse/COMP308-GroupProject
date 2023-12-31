import React, { Component }  from 'react';

// this is the home page component
function Home(props)
{

    return (
        <div>
            <h2> Express - React with CRUD Operations</h2>
            <p>React front-end calls Express REST API to add, 
            list, update, or delete a user, create an course, etc.</p>
        </div>
    );

}
// withRouter will pass updated match, location, and history props 
// to the wrapped component whenever it renders.
export default Home;


// import React from 'react';

// import { Link } from 'react-router-dom';
// import './Home.css'; 


// function Home() {
//   return (
//     <Container className="home-container" maxWidth="md">
//       <header>
//         <Typography variant="h3" align="center" gutterBottom>
//           Welcome to Health Monitor
//         </Typography>
//       </header>
//       <main>
//         <section className="login-register-section">
//           <Typography variant="h4" align="center" gutterBottom>
//             Login or Register
//           </Typography>
//           <Typography variant="body1" align="center" paragraph>
//             Choose your role to get started:
//           </Typography>
//           <div className="buttons-container">
//             <Button
//               component={Link}
//               to="/login"
//               variant="contained"
//               color="primary"
//               size="large"
//               style={{ marginRight: '16px' }}
//               className="login-button" // Apply CSS class for the button
//             >
//               Login
//             </Button>
//             <Button
//               component={Link}
//               to="/register"
//               variant="contained"
//               color="secondary"
//               size="large"
//               className="register-button" // Apply CSS class for the button
//             >
//               Register
//             </Button>
//           </div>
//         </section>
//       </main>
//       <footer>
//         <Typography variant="body2" align="center" color="textSecondary">
//           &copy; 2023 Health Monitor
//         </Typography>
//       </footer>
//     </Container>
//   );
// }

// export default Home;
