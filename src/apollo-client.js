import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookie from 'js-cookie';
import { onError } from '@apollo/client/link/error';
import {logout} from './services/AuthService'

const httpLink = createHttpLink({
  uri: 'https://graphql.eu.fauna.com/graphql'
});

const logoutLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError?.statusCode === 401 || graphQLErrors?.some(error => error.message === 'Invalid database secret.')) logout();
})

const authLink = setContext((_, { headers }) => {
  const secret = Cookie.get('fauna-session');
  const token = secret ? JSON.parse(secret) : process.env.REACT_APP_PUBLIC_FAUNA_SECRET
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: from([
    logoutLink,
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache(),
});

export default client;