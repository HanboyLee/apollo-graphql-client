import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
//compontnets
import CardTemplate from './CardTemplate';
import PokemonItemInfo from './PokemonItemInfo';
import Loading from '../../components/Loading';
import { GetPokemon } from '../../features/Pokemon/pokemonCreateAsync';

const PokemonTemplate = (props) => {
    const fatchDatas = useSelector((state) => state.pokemon);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(GetPokemon(1));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (fatchDatas?.initLoading)
        return <Loading styles={{ width: 200, height: 200, margin: `0 auto` }} loading={fatchDatas.initLoading} />;
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={'pokemon'} />} />
                <Route path={'/pokemon'} element={<CardTemplate fatchData={fatchDatas.datas} />} />
                <Route path={`/pokemon/:id`} element={<PokemonItemInfo />} />
            </Routes>
        </div>
    );
};

export default PokemonTemplate;
