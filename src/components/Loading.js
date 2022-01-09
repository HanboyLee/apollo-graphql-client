import React from 'react';
import IMG from '../assets/images/giphy.gif';
import * as MTL from '@material-ui/core';
import * as Lab from '@material-ui/lab';

const Loading = ({ loading, styles = {} }) => {
    const LoadCom = () =>
        loading ? (
            <>
                <Lab.Skeleton animation="wave" variant="rect" height={`70%`} width={`100%`} />
                <Lab.Skeleton variant="text" animation="wave" width={`100%`} height={20} />
                <Lab.Skeleton animation="wave" variant="text" width={`60%`} height={20} />
            </>
        ) : (
            <MTL.Typography variant="h3"> No Script</MTL.Typography>
        );
    return (
        <MTL.Box style={{ ...styles, borderRadius: `20px` }}>
            <LoadCom />
        </MTL.Box>
    );
};

export default Loading;
