import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookie from 'js-cookie';

const httpLink = createHttpLink({
  uri: 'https://graphql.eu.fauna.com/graphql'
});

const authLink = setContext((_, { headers }) => {
  const cookies = Cookie.get('fauna-session');
  const token = cookies ? JSON.parse(cookies).secret : process.env.REACT_APP_PUBLIC_FAUNA_SECRET
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;