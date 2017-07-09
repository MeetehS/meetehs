// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider
} from 'react-apollo'
import 'bootstrap/dist/css/bootstrap.css'

import App from './containers/App'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: '/graphql' })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
