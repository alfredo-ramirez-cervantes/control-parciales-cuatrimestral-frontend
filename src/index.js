
import React                from 'react';
import ReactDOM             from 'react-dom';
import { ApolloProvider }   from 'react-apollo';
import ApolloClient         from 'apollo-boost';
import { InMemoryCache }    from 'apollo-cache-inmemory';

import './index.css';
import {RootSession}        from './App';
import * as serviceWorker   from './serviceWorker';

const api = new ApolloClient({
	cache: new InMemoryCache({
		addTypename: false
	}),
    //uri: process.env.REACT_APP_API_CAT_GEN_ENDPOINT,    
    uri: "http://localhost:5000/",
    onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors);
		console.log('networkError', networkError);
	}
});

ReactDOM.render(
    <ApolloProvider client={api}>
        <RootSession />
    </ApolloProvider>
    , document.getElementById('root')
);

serviceWorker.unregister();