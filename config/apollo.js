import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch'
import { setContext } from 'apollo-link-context';

let api = process.env.uriApi;

const httpLink = createHttpLink(
    {
    uri: api,
    fetch   
});

const authLink = setContext((_, { headers }) => {

    return {
        headers: {
            ...headers
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache({addTypename: false}),
    link: httpLink
});

export default client;
