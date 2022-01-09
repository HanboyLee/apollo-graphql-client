import React from 'react';
import * as MTL from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Formik, Form, ErrorMessage, Field } from 'formik';
//components
import FormikInput from '../../components/userComponents/FormikInput';
import { EDITUSERPROFILE } from '../../graphql';
import { useMutation } from '@apollo/client';
import { useUser } from '../../hooks/useUserHelper';
import { useAlert } from 'react-alert';
import { gql } from '@apollo/client';
import { SaveRounded } from '@material-ui/icons';

const FromikUserEdit = () => {
    // name, age, address, phone, job,gender
    //type {text,number,text,text,text,number}
    const classes = useStyles();
    const alert = useAlert();
    const [user] = useUser();
    const [EditMutate] = useMutation(EDITUSERPROFILE);
    const initialValues = React.useMemo(
        () => ({
            name: user?.name ?? '',
            age: user?.age ?? 0,
            address: user?.address ?? '',
            gender: user?.gender ?? -1,
            job: user?.job ?? '',
        }),
        [user]
    );

    const onSubmit = async (values, actions) => {
        try {
            const variables = {
                input: {
                    id: user.id,
                    address: values.address,
                    age: values.age,
                    gender: values.gender,
                    job: values.job,
                    name: values.name,
                },
            };
            await EditMutate({
                variables,
                update(cache, { data: { UserProfile } }) {
                    console.log(cache, 'cache', UserProfile);
                    cache.modify({
                        id: cache.identify(variables),
                        fields: {
                            editUserProfile(existingCommentRefs = []) {
                                const newCommentRef = cache.writeFragment({
                                    data: UserProfile,
                                    fragment: gql`
                                        fragment NewUser on User {
                                            id
                                            email
                                            age
                                            name
                                            phone
                                            job
                                            gender
                                            address
                                        }
                                    `,
                                });
                                return [...existingCommentRefs, newCommentRef];
                            },
                        },
                    });
                },
            });

            alert.success('13222');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <MTL.Paper className={classes.root}>
            <MTL.Box paddingBottom={`2rem`}>
                <MTL.Typography variant="h5" gutterBottom>
                    用戶資料
                </MTL.Typography>
                <MTL.Typography variant="body1" color="textSecondary">
                    個人資訊編輯欄
                </MTL.Typography>
            </MTL.Box>
            <MTL.Divider />
            <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize={true}>
                {({ values, handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <MTL.Grid container>
                                <MTL.Grid container item justifyContent="space-around">
                                    <WithGrid item>
                                        <FormikInput
                                            fullWidth
                                            name="name"
                                            label={'名稱'}
                                            placeholder={'尚未輸入'}
                                            type={'text'}
                                        />
                                    </WithGrid>
                                    <WithGrid item>
                                        <FormikInput
                                            name="age"
                                            label={'年齡'}
                                            placeholder={'尚未輸入'}
                                            type={'number'}
                                            // inputProps={{ max: 100, min: 0 }}
                                        />
                                    </WithGrid>
                                </MTL.Grid>
                                <MTL.Grid container item justifyContent="space-around">
                                    <WithGrid item flex={1}>
                                        <FormikInput name="job" label={'職位'} placeholder={'尚未輸入'} type={'text'} />
                                    </WithGrid>
                                    <WithGrid item flex={1}>
                                        <RadioGender name="gender" />
                                    </WithGrid>
                                </MTL.Grid>

                                <MTL.Box className={classes.addressContainer}>
                                    <FormikInput name="address" label={'地址'} placeholder={'尚未輸入'} type={'text'} />
                                </MTL.Box>
                            </MTL.Grid>
                            <MTL.Box className={classes.btn}>
                                <MTL.Button
                                    startIcon={<SaveRounded />}
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                >
                                    <MTL.Typography color="textSecondary" variant="body2">
                                        更新資料
                                    </MTL.Typography>
                                </MTL.Button>
                            </MTL.Box>
                        </Form>
                    );
                }}
            </Formik>
        </MTL.Paper>
    );
};

const WithGrid = withStyles({
    root: {
        padding: `2rem 2rem`,
        flex: 1,
    },
})(MTL.Grid);
const useStyles = makeStyles((theme) => ({
    root: {
        test: console.log(theme),
        padding: theme.spacing(3),
    },
    addressContainer: {
        width: '100%',
        padding: `0 2rem`,
    },
    btn: {
        textAlign: `end`,
        marginTop: `2rem`,
    },
}));

const RadioGender = ({ name, label }) => {
    if (!name) {
        return null;
    }
    return (
        <Field name={name} label={label}>
            {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors, setFieldValue, ...rest }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
            }) => {
                const onchange = (e) => {
                    setFieldValue(field.name, parseInt(e.target.value));
                };
                return (
                    <>
                        <MTL.FormControl component="fieldset">
                            <MTL.FormLabel component="legend">性別</MTL.FormLabel>
                            <MTL.RadioGroup row={true} name={field.name} onChange={onchange}>
                                <MTL.FormControlLabel
                                    control={
                                        <MTL.Radio name="gender" value={0} checked={parseInt(field.value) === 0} />
                                    }
                                    label="男"
                                />
                                <MTL.FormControlLabel
                                    control={
                                        <MTL.Radio name="gender" value={1} checked={parseInt(field.value) === 1} />
                                    }
                                    label="女"
                                />
                            </MTL.RadioGroup>
                        </MTL.FormControl>
                        <ErrorMessage name={field.name} component={Custom} />
                    </>
                );
            }}
        </Field>
    );
};
const Custom = ({ children }) => (
    <MTL.Typography variant="subtitle2" color="error" className="error">
        {children}
    </MTL.Typography>
);

export default FromikUserEdit;
