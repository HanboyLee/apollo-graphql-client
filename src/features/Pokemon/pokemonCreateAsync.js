import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../services/pokemonApi';
import axios from 'axios';
export const GetPokemon = createAsyncThunk('pokemon/getPokemons', async (pageNumber, { getState }) => {
    const datas = await instance
        .get(``, { params: { offset: 0, limit: 20 } })
        .then((res) => res.data)
        .then((data) => data.results);
    const names = datas.map((item) => item.name);
    const dataLists = await convertDatas(names);

    return { dataLists, pageNumber };
});

export const GetNextPokemon = createAsyncThunk('pokemon/getNextPokemon', async (pageNumber, { getState }) => {
    const pagination = { limit: 20, offset: 20 * pageNumber };
    const datas = await instance
        .get(``, { params: pagination })
        .then((res) => res.data)
        .then((data) => data.results);
    const names = datas.map((item) => item.name);
    const dataLists = await convertDatas(names);

    return { dataLists, pageNumber };
});

const convertDatas = async (names) => {
    return await Promise.all(
        names.map(async (name) => {
            const zhHantData = await axios
                .get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
                .then((res) => res.data);
            const ObjData = await instance.get(`/${name}`).then((res) => res.data);
            ObjData.name = zhHantData['names'][3]['name'];
            ObjData.name_EN = zhHantData['names'][8]['name'];
            ObjData['flavor_text_entries'] = zhHantData['flavor_text_entries'].filter(filterNeedLaguageAndVersion);
            return ObjData;
        })
    );
};

const filterNeedLaguageAndVersion = (item) => {
    const language = item.language.name;
    const versionOri = item.version.name;
    const versions = ['lets-go-pikachu', 'sword', 'shield', 'sun', 'moon', 'ultra-sun', 'ultra-moon'];
    return language === 'zh-Hant' && versions.some((t) => t === versionOri);
};
