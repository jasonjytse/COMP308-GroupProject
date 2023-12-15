/**
 *
 * Author: Jason Tse
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

const config = require('./config/config');
const masterSchema = require('./schemas/master.server.schema');
const JWT_SECRET = config.JWT_SECRET; // your secret key
const jwtExpirySeconds = config.jwtExpirySeconds;

// Create a new Mongoose connection instance
const db = configureMongoose();

// Create a new Express application instance
const app = configureExpress();

// Configure CORS options
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

// Add a middleware for checking JWT and making user info available in the context
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
    } catch (e) {
      // Token is invalid
    }
  }
  next();
});

// Configure GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP((request, response) => {
    return {
      schema: nursePatientVitalSchema,
      rootValue: global,
      graphiql: true,
      context: {
        req: request,
        res: response,
      },
    };
  })
);

// Use the Express application instance to listen to the '4000' port
app.listen(4000, () => console.log('Express GraphQL Server Now Running On http://localhost:4000/graphql'));

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
