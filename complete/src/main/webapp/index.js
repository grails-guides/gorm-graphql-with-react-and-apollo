import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/App.css';
import './css/grails.css';
import './css/main.css';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const client = new ApolloClient({ //<1>
  link: new HttpLink(), //<2>
  cache: new InMemoryCache()
});


ReactDOM.render( //<3>
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);
