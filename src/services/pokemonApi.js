import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon',
    method: 'GET',
});

instance.interceptors.request.use(
    async (config) => {
        return config;
    },
    (err) => {
        return err.message;
    }
);
instance.interceptors.response.use(
    async (config) => {
        return config;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    console.log('你要找的頁面不存在');
                    // go to 404 page
                    break;
                case 500:
                    console.log('程式發生問題');
                    // go to 500 page
                    break;
                default:
                    console.log(error.message);
            }
        }
    }
);

export default instance;
