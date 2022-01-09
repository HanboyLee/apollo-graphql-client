import { ApolloClient, createHttpLink, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
//configs
import { Url } from './config';

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            // window.location.href = Url;
            // localStorage.clear();
        });
    if (networkError) {
        // window.location.href = Url;
        // localStorage.clear();
        console.log(`[Network error]: ${networkError}`);
    }
});

const cache = new InMemoryCache();

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'cache-and-network',
    },
};

const httpLink = createHttpLink({
    uri: 'http://localhost:5500/graphql',
    headers: {
        'keep-alive': 'true',
    },
});
const uploadLink = createUploadLink({
    uri: `http://localhost:5500/graphql`,
    headers: {
        'keep-alive': 'true',
    },
});

// const authMiddleware = new ApolloLink((operation, forward) => {
//     // add the authorization to the headers
//     console.log(123, '???');
//     const token = localStorage.getItem('token');
//     operation.setContext(({ headers = {} }) => ({
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : '',
//         },
//     }));
//     return forward(operation);
// });

const authLink = setContext((_, { headers }) => {
    try {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('token');
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    } catch (error) {
        console.log(error, 'error');
    }
});
const client = new ApolloClient({
    cache,
    defaultOptions,
    // link: from([errorLink, authLink, httpLink]),
    link: from([errorLink, authLink, uploadLink]),
    // link: authLink.concat(httpLink),
    // link: from([concat(httpLink, authMiddleware).concat(errorLink)]),
});
export default client;
