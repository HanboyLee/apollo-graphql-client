import React from 'react';
import * as MTL from '@material-ui/core';
import { pokemonSlice } from '../../features/Pokemon/pokemonSlice';

import { useSelector, useDispatch } from 'react-redux';
//route
import { useParams } from 'react-router-dom';

//utils
import { splitStr } from './utils';
const PokemonItemInfo = (props) => {
    const { getSignlePokemon } = pokemonSlice.actions;
    const { single } = useSelector((state) => state.pokemon);
    const dispatch = useDispatch();
    const params = useParams();
    const currentName = splitStr(params.id, '&');

    React.useEffect(() => {
        dispatch(getSignlePokemon({ currentName }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const imageSrcs = React.useMemo(() => {
        if (single?.sprites) {
            const srcs = Object.values(single.sprites.other.dream_world);
            return srcs.filter((item) => item);
        }
        return [];
    }, [single]);
    console.log(single, 'single');
    return (
        <MTL.Grid container>
            {/* <Outlet /> */}
            {/* pokemon Images */}
            <MTL.Grid container item justifyContent="center">
                {imageSrcs?.map((src, index) => {
                    return (
                        <MTL.Grid key={index} item>
                            <img src={src} alt="img" />
                        </MTL.Grid>
                    );
                })}
            </MTL.Grid>
            1111111
        </MTL.Grid>
    );
};

export default PokemonItemInfo;
