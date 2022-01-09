import React from 'react';
import * as MTL from '@material-ui/core';
import _ from 'lodash';
import { GetNextPokemon } from '../../features/Pokemon/pokemonCreateAsync';

// redux
import { useDispatch, useSelector } from 'react-redux';
//components
import PokemonCard from './PokemonCard';
import { Loading } from '../../components';

import { useInView } from 'react-intersection-observer';

const CardTemplate = ({ fatchData }) => {
    const dispatch = useDispatch();
    const unMountedRef = React.useRef(false);
    const { ref, inView, entry } = useInView({ threshold: 0 });
    const fatchDatas = useSelector((state) => state.pokemon);

    React.useEffect(() => {
        if (unMountedRef.current) {
            if (inView) {
                dispatch(GetNextPokemon(fatchDatas.pageNumber));
            }
        }
        unMountedRef.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    return (
        <div>
            {
                <MTL.Grid xl={12} container>
                    {fatchDatas?.datas?.map((props, index) => {
                        return (
                            <MTL.Grid
                                ref={fatchDatas?.datas.length - 1 === index ? ref : null}
                                key={index}
                                item
                                xl={2}
                                md={4}
                                lg={2}
                                sm={6}
                            >
                                <PokemonCard {...props} />
                            </MTL.Grid>
                        );
                    })}
                    {/* Loading */}
                    {fatchDatas?.loading && fatchDatas.status !== 'failed' && (
                        <MTL.Grid item xl={2} md={4} lg={2} sm={6}>
                            <Loading styles={{ margin: `1rem`, height: `100%` }} loading={fatchDatas.loading} />
                        </MTL.Grid>
                    )}
                    {/* Error */}
                </MTL.Grid>
            }
        </div>
    );
};

export default CardTemplate;
