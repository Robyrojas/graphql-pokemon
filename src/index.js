import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://graphql-pokemon.now.sh/'
})

const client = new ApolloClient({
  cache,
  link
})
/*
ReactDOM.render(
  <ThemeProvider theme={theme}>
    {}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root'),
);
*/
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
  
);

//serviceWorker.unregister();
