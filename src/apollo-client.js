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
  // const token = secret ? JSON.parse(secret) : process.env.REACT_APP_PUBLIC_FAUNA_SECRET
  return {
    headers: {
      ...headers,
      authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVoMUtGaFdfMk56d1hTLWsxdHFKOCJ9.eyJpc3MiOiJodHRwczovL2Rldi16YXVvbmh3dWtibHVpMW52LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODg3NDYyNDkxNTc0Mzg4MTM2MCIsImF1ZCI6WyJodHRwczovL2RiLmZhdW5hLmNvbS9kYi95MTY5Ym8zYm95cmM2IiwiaHR0cHM6Ly9kZXYtemF1b25od3VrYmx1aTFudi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjcwMDc3NjEwLCJleHAiOjE2NzAxNjQwMTAsImF6cCI6IjJBeGZyZEtaR0tuYnpHaG1yeldrZEV4OW1Qbzd6OEloIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.W-F4eA3nPx9KVP9d3mSU51dRBGbvMy05NOKo2aIp3D8GlQ9UCYFCoEbvEA1u1ocQnjer0kAn0xcEXcydfJVjlI4mkwlSgcBltQOxsHv8bCoKoVySP8-0euZFCHjr52qNAescz41EMcznuSfULkwr2esetkhd15fPcRpiM2kscl0RCTw9CBQaL51pxmo0AvMy0_GKF1-29DYCUvb07PtcfYQW5oNCY5YZqbGIIAlYRIOKm6mEwaUFN96zlHEa7rfke6w8H5ijvn3Co5FTpbNa4aKR1wCvPIIc_M1MOy5OrliO-ckagINIvsGmXh9J3JgjRz5z49Rqxkk0-y9T0WFwmg'
    }
  };
});

const client = new ApolloClient({
  link: from([
    logoutLink,
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // All this queries mutation triggers 'recommendation' warning. They won't be included in build.
          // So it's possible to remove later.
          getContactsByUserId: {
            merge(existing, incoming) {
              return incoming;
            }
          },
          getSentContactRequests: {
            merge(existing, incoming) {
              return incoming;
            }
          },
          getIncomingContactRequests: {
            merge(existing, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  })
});

export default client;