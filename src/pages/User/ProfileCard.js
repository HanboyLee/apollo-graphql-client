import React from 'react';
import * as MTL from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import { useUser } from '../../hooks/useUserHelper';
import { CloudUploadRounded } from '@material-ui/icons';
import { withMedia } from '../../hooks/MediaProvider';
import { getFileExtensions, extractIsExistExtensions, getFileName } from '../../helpers/common';
import { useAlert } from 'react-alert';
//gql
import { UPLOADIMAGE } from '../../graphql';
import { useMutation, useApolloClient } from '@apollo/client';
const ProfileCard = () => {
    const classes = useStyles();
    //hooks
    const [user] = useUser();
    const alert = useAlert();
    const client = useApolloClient();
    //gql
    const [UploadImage] = useMutation(UPLOADIMAGE);
    const onHandlefile = async (e) => {
        // png,jpeg"
        e.preventDefault();

        // fileName.slice(((fname.lastIndexOf('.') - 1) >>> 0) + 2);
        for await (const file of e.target.files) {
            const ext = getFileExtensions(file.name);
            console.log(ext, '111');
            if (!extractIsExistExtensions(['png', 'jpeg'], ext)) {
                alert.error('档案格式不相符');
                return;
            }
            const name = getFileName(file.name);
        }
        const data = await UploadImage({
            variables: {
                file: e.target.files[0],
                size: e.target.files[0].size,
            },
        });
        client.resetStore();
        console.log(data, 'get....');
    };

    return (
        <MTL.Card>
            <MTL.Box sx={{ display: 'flex', justifyContent: 'center', paddingY: `1rem` }}>
                <MTL.Avatar sx={{ flex: 1 }} src={user?._thumbnail} className={classes.avatar}>
                    {user?._thumbnail ? null : `R`}
                </MTL.Avatar>
            </MTL.Box>
            <MTL.CardContent>
                <MTL.Typography variant="h5" color="textPrimary" gutterBottom>
                    姓名:{user?.name ?? '這傢伙很懶什麼都不留'}
                </MTL.Typography>
                <MTL.Typography variant="body1" color="textSecondary">
                    地址:{user?.address ?? '這傢伙很懶什麼都不留'}
                </MTL.Typography>
            </MTL.CardContent>
            <MTL.Divider />
            <MTL.CardActions>
                {/* <MTL.Button startIcon={<CloudUploadRounded />} color="secondary" fullWidth variant="outlined">
                    上傳圖片
                </MTL.Button> */}

                <label htmlFor="raised-button-file" style={{ width: '100%', overflow: 'auto' }}>
                    <MTL.Button
                        startIcon={<CloudUploadRounded />}
                        color="secondary"
                        fullWidth
                        variant="outlined"
                        component="span"
                    >
                        Upload
                    </MTL.Button>
                    <input
                        accept="image/png, image/jpeg"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={onHandlefile}
                    />
                </label>
            </MTL.CardActions>
        </MTL.Card>
    );
};

export default withMedia(ProfileCard);

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        textAlign: 'center',
        backgroundColor: red[500],
        height: 64,
        mb: 2,
        width: 64,
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
    },
}));
