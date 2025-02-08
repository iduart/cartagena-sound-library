import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import config from "./config";

// Create an HTTP link that connects to the server.
const link = new HttpLink({
  uri: config.API_URL,
});

// Create an in-memory cache instance for caching GraphQL data.
const cache = new InMemoryCache();

// Instantiate Apollo Client with the link and cache instance.
const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true, // This is helpful for debugging in development.
});

export default client;
