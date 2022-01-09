import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import user from './user';

import { userSlice } from './User/userSlice';
import { pokemonSlice } from '../features/Pokemon/pokemonSlice';

const reducer = combineReducers({
    user: userSlice.reducer,
    pokemon: pokemonSlice.reducer,
});

const store = configureStore({
    reducer,
    middleware: [thunk],
});
export default store;
// export * from './slices';
// export const actions = import('./slices');
