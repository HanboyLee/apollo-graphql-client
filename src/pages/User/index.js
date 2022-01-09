import React from 'react';
import * as MTL from '@material-ui/core';

// componets
import ProfileCard from './ProfileCard';
import FromikUserEdit from './FromikUserEdit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    userCardGrid: {
        [theme.breakpoints.down('sm')]: {
            paddingBottom: `2rem`,
        },
    },
}));
const UserPage = () => {
    const classes = useStyles();

    return (
        <div>
            <MTL.Grid container>
                {/* header */}
                <MTL.Grid container item justifyContent="flex-start" alignItems="center">
                    <MTL.Typography variant={'h3'} gutterBottom>
                        個人帳戶
                    </MTL.Typography>
                </MTL.Grid>
                {/* body */}
                <MTL.Grid container item justifyContent={'space-around'}>
                    {/* 使用者卡片 */}
                    <MTL.Grid item sm={4} className={classes.userCardGrid}>
                        <ProfileCard />
                    </MTL.Grid>
                    {/* 使用者編輯 */}
                    <MTL.Grid item sm={7}>
                        <FromikUserEdit />
                    </MTL.Grid>
                </MTL.Grid>
            </MTL.Grid>
        </div>
    );
};

export default UserPage;
