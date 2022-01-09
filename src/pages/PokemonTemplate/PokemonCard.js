import React from 'react';
import * as MTL from '@material-ui/core';
import * as ICON from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

//utils
import { capitalizeFirstLetter } from '../../helpers/common';
import { useLocation, NavLink } from 'react-router-dom';

//router
const PokemonCard = ({ name, id, sprites, ...props }) => {
    const classes = useStyles();
    const location = useLocation();

    const convertString = (id) => {
        const strId = id?.toString();
        const charLength = strId.length.toString();
        switch (charLength) {
            case '1': {
                return strId.padStart(3, '00');
            }
            case '2': {
                return strId.padStart(3, '0');
            }
            default:
                return strId.padStart(3, '0');
        }
    };

    return (
        <NavLink style={{ textDecoration: 'none' }} to={`${location.pathname}/${id}&${name}`}>
            <MTL.Card className={classes.root} key={id}>
                <MTL.CardActionArea>
                    <MTL.Typography align="center" variant="h5" component="h2">
                        #{id && convertString(id)}
                    </MTL.Typography>
                    <MTL.CardMedia
                        src={`${sprites?.other['official-artwork'].front_default}`}
                        title={name}
                        component="img"
                        height={'100%'}
                    />
                    {/* </MTL.Box> */}
                    <MTL.CardContent>
                        <MTL.Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <MTL.Chip
                                icon={<ICON.Reddit />}
                                size="medium"
                                variant="outlined"
                                label={capitalizeFirstLetter(name)}
                                color="primary"
                            />
                        </MTL.Box>

                        <MTL.Box sx={{ display: `flex`, justifyContent: 'space-around' }}>
                            <MTL.Chip icon={<ICON.HeightRounded />} label={`${props.height}`} color="primary" />
                            <MTL.Chip
                                icon={<ICON.AccessibilityNewRounded />}
                                label={`${props.weight}`}
                                color="secondary"
                            />
                        </MTL.Box>
                        <MTL.Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                            {props?.types?.map((t, i) => (
                                <MTL.Chip
                                    key={i}
                                    avatar={<MTL.Avatar>T</MTL.Avatar>}
                                    size="small"
                                    label={t.type.name}
                                    color={'default'}
                                />
                            ))}
                        </MTL.Box>
                    </MTL.CardContent>
                </MTL.CardActionArea>
            </MTL.Card>
        </NavLink>
    );
};
const useStyles = makeStyles({
    root: {
        minWidth: 250,
        minHeight: 300,
        margin: '10px 10px',
    },
    media: {
        border: '5px soild #000',
    },
});

export default PokemonCard;
