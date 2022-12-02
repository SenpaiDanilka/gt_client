import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client'
import {I18nextProvider} from "react-i18next";
import i18n from './i18n';
import {HashRouter} from "react-router-dom";
import {LoadingProvider} from "./contexts/LoadingContext";
import { Auth0Provider } from '@auth0/auth0-react' 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log(process.env.REACT_APP_PUBLIC_AUTH0_DOMAIN)
console.log(process.env.REACT_APP_PUBLIC_AUTH0_CLIENTID)
console.log(process.env.REACT_APP_PUBLIC_AUTH0_AUDIENCE)
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        
        <HashRouter basename='/'>
          <LoadingProvider>
            <Auth0Provider
              domain={process.env.REACT_APP_PUBLIC_AUTH0_DOMAIN!}
              clientId={process.env.REACT_APP_PUBLIC_AUTH0_CLIENTID!}
              audience={process.env.REACT_APP_PUBLIC_AUTH0_AUDIENCE}
              redirectUri={window.location.origin}
            >
              <App />
            </Auth0Provider>
          </LoadingProvider>
        </HashRouter>
      </I18nextProvider>
    </React.StrictMode>
  </ApolloProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
