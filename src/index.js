import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import client from './configs/client';
import store from './features';
import { UserProvider } from './hooks/useUserHelper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertMUITemplate from 'react-alert-template-mui';
import './index.css';
import reportWebVitals from './reportWebVitals';
const options = {
    positions: positions.MIDDLE,
};
ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <UserProvider>
                <AlertProvider template={AlertMUITemplate} {...options}>
                    <App />
                </AlertProvider>
            </UserProvider>
        </ApolloProvider>
    </Provider>,

    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
