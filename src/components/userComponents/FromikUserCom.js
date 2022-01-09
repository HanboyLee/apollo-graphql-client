import React from 'react';
import { Formik, Form } from 'formik';
import * as MTL from '@material-ui/core';
import FormikInput from './FormikInput';
import theme from '../../configs/theme';
import { withStyles } from '@material-ui/core/styles';
import { SupervisedUserCircleRounded } from '@material-ui/icons';

const FromikUserCom = ({ textData, setIsLogin, initialValues, validationSchema, onSubmit }) => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, handleReset, handleSubmit, ...props }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <FromTable info={textData} setIsLogin={setIsLogin} handleReset={handleReset} {...props} />
                    </Form>
                );
            }}
        </Formik>
    );
};

const FromTable = ({ setIsLogin, handleReset, info, ...props }) => {
    const onChangeMethod = () => {
        setIsLogin((prev) => !prev);
        handleReset();
    };
    return (
        <>
            <MTL.Typography align="center" variant="body1">
                <SupervisedUserCircleRounded /> 用戶{info.category}
            </MTL.Typography>
            <MTL.Box sx={{ textAlign: 'end', padding: theme.spacing(2) }}>
                {info.inputLoader.map((item) => (
                    <MTL.Box sx={{ pb: 2 }} key={item.name}>
                        <FormikInput
                            type={item.type}
                            name={item.name}
                            label={item.label}
                            placeholder={item.placeholder}
                        />
                    </MTL.Box>
                ))}
            </MTL.Box>
            <MTL.Box sx={{ textAlign: 'end', padding: theme.spacing(2) }}>
                <MTL.ButtonGroup fullWidth variant="contained">
                    <StyleButton
                        onClick={() => handleReset()}
                        variant="outlined"
                        color="secondary"
                        bgclr={theme.palette.error.dark}
                    >
                        全部清除
                    </StyleButton>
                    <StyleButton
                        type="submit"
                        bgclr={theme.palette.primary.main}
                        variant="outlined"
                        disabled={props.isSubmitting}
                    >
                        {info.category}
                    </StyleButton>
                </MTL.ButtonGroup>
            </MTL.Box>
            <MTL.Box onClick={onChangeMethod} style={{ float: 'right', cursor: 'pointer' }}>
                <MTL.Typography color="textSecondary">{info.promptInfo}</MTL.Typography>
            </MTL.Box>
        </>
    );
};

const StyleButton = withStyles((theme) => ({
    root: {
        background: (props) => props?.bgclr,
        color: '#000',
    },
}))(MTL.Button);

export default FromikUserCom;
