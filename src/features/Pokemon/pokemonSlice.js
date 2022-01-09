import { createSlice } from '@reduxjs/toolkit';
import { GetPokemon, GetNextPokemon } from './pokemonCreateAsync';

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        datas: [],
        loading: false,
        error: null,
        status: '',
        pageNumber: 0,
        initLoading: false,
        isError: false,
    },
    reducers: {
        getSignlePokemon: (state, action) => {
            const getCurrentItem = state.datas.find((item) => item.name === action.payload.currentName);
            state.single = getCurrentItem;
        },
    },
    extraReducers: {
        [GetPokemon.pending]: (state, action) => {
            state.status = 'loading';
            state.initLoading = true;
            state.single = {};
        },
        [GetPokemon.fulfilled]: (state, action) => {
            state.status = 'success';
            state.datas = action.payload.dataLists;
            state.pageNumber = action.payload.pageNumber;
            state.initLoading = false;
        },
        [GetPokemon.rejected]: (state, action) => {
            state.status = 'failed';
            state.loading = false;
            state.error = '獲取資料失敗請查修 pokemonSlice 檔案';
        },
        [GetNextPokemon.pending]: (state, action) => {
            state.status = 'loading';
            state.loading = true;
            state.single = {};
        },
        [GetNextPokemon.fulfilled]: (state, action) => {
            state.status = 'success';
            const prevData = JSON.parse(JSON.stringify(state.datas));
            // if (!prevData.length) {
            state.loading = false;

            state.datas = [...prevData, ...action.payload.dataLists];
            // console.log(state.datas, 'action');
            state.pageNumber = action.payload.pageNumber + 1;
        },
        [GetNextPokemon.rejected]: (state, action) => {
            state.status = 'failed';
            state.isError = true;
            state.error = '獲取資料失敗請查修 pokemonSlice 檔案';
        },
    },
});
