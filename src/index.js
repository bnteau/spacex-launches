import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from '@apollo/client/react';
import SpacexLaunches from './Launches';

const uri = 'https://api.spacex.land/graphql/';
const cache = new InMemoryCache();

const client = new ApolloClient({ uri, cache });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {/* <App /> */}
      <SpacexLaunches />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
