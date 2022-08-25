import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.APOLLO_CLIENT_URL,
  headers: {
    Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
  },
  cache: new InMemoryCache(),
});

export default client;
