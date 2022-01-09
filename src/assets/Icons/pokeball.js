import React from 'react';
import * as MTL from '@material-ui/core';
import ICON from '../images/pokeball.png';
const PokeballIcon = () => {
    return (
        <MTL.Box sx={{ height: 24, width: 24 }}>
            <img style={{ width: '100%', height: '100%' }} src={ICON} alt="" />
        </MTL.Box>
    );
};

export default PokeballIcon;
