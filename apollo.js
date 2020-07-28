import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from "apollo-cache-inmemory";

const link = new HttpLink({ uri: `http://192.168.1.55:8000/`});
// create an inmemory cache instance for caching graphql data
const cache = new InMemoryCache()
// instantiate apollo client with apollo link instance and cache instance
const client = new ApolloClient({
  link,
  cache
});

export default client;