import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Replace 'YOUR_GRAPHQL_ENDPOINT' with the URL of your GraphQL server
const GRAPHQL_ENDPOINT = 'http://localhost:3000/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
