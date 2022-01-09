//hooks
//gql
import { useMutation, useApolloClient } from '@apollo/client';
import * as MTL from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { LOGINUSER, SIGNUPUSER } from '../graphql';
import { useHandleClearToken, useLoginState, useUser } from '../hooks/useUserHelper';
import FromikUserCom from './userComponents/FromikUserCom';
import { useAlert } from 'react-alert';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        minWidth: '300px',
        width: '40vw',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        padding: theme.spacing(2, 4, 3),
        ...theme.shape,
    },
}));

const LoginUser = () => {
    const [show, setShow] = React.useState(false);
    const [loginState, setLoginState] = useLoginState();
    const handleClearToken = useHandleClearToken();
    const navigate = useNavigate();
    const onClick = () => setShow(true);
    const client = useApolloClient();
    const onLogout = () => {
        handleClearToken();
        navigate('/');
        client.resetStore();
    };
    const handleClose = React.useCallback(() => setShow(false), []);

    //偵測使用者是否登入在狀態
    React.useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
            client.resetStore();
        }
        if (localStorage.getItem('token')) {
            setLoginState(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {/* 登入 */}
            {!loginState && (
                <MTL.Button variant="contained" onClick={onClick} color="secondary">
                    <MTL.Typography color={'textSecondary'}>用戶登入</MTL.Typography>
                </MTL.Button>
            )}
            {/* 登出 */}
            {loginState && (
                <MTL.Button variant="contained" onClick={onLogout} color="secondary">
                    {<MTL.Typography color={'textSecondary'}>登出</MTL.Typography>}
                </MTL.Button>
            )}

            {/* 登入彈跳視窗 */}
            <LoginModal show={show} handleClose={handleClose} />
        </>
    );
};

const LoginModal = ({ show, handleClose }) => {
    const classes = useStyles();
    const [isLogin, setIsLogin] = React.useState(true);
    const [LoginUser] = useMutation(LOGINUSER);
    const [SignupUser] = useMutation(SIGNUPUSER);
    const alert = useAlert();

    const navigate = useNavigate();
    //hooks
    const [, setUser] = useUser();
    const [, setUserLoginState] = useLoginState();

    const loginValidationSchema = yup.object({
        email: yup.string('輸入你的信箱').email('輸入您的有效信箱').required('信箱必填'),
        password: yup.string('輸入密碼').min(6, '密碼必須大於六位數').required('密碼必填'),
    });
    const signupValidationSchema = yup.object({
        email: yup.string('輸入你的信箱').email('輸入您的有效信箱').required('信箱必填'),
        password: yup.string('輸入密碼').min(6, '密碼必須大於六位數').required('密碼必填'),
        verifyPwd: yup.string('輸入密碼').min(6, '密碼必須大於六位數').required('密碼必填'),
    });

    const loginData = {
        category: '登入',
        inputLoader: [
            { name: 'email', label: '信箱', placeholder: '輸入您的信箱', type: 'email' },
            { name: 'password', label: '密碼', placeholder: '輸入您的密碼', type: 'password' },
        ],
        promptInfo: '沒有帳號嗎？快速註冊！',
    };

    const signupData = {
        category: '註冊',
        inputLoader: [
            { name: 'email', label: '信箱', placeholder: '輸入您的信箱', type: 'email' },
            { name: 'password', label: '密碼', placeholder: '輸入您的密碼', type: 'password' },
            { name: 'verifyPwd', label: '密碼', placeholder: '再次輸入密碼', type: 'password' },
        ],
        promptInfo: '沒有帳號嗎？快速註冊！',
    };

    const loginInitialValues = {
        email: '',
        password: '',
    };
    const sigupInitialValues = {
        email: '',
        password: '',
        verifyPwd: '',
    };

    //登入
    const onLoginSubmit = React.useCallback(
        async (values, actions) => {
            try {
                const variables = {
                    input: {
                        email: values.email,
                        password: values.password,
                    },
                };
                const { data, errors } = await LoginUser({ variables });
                if (errors) {
                    throw new Error(errors);
                }
                //輸入錯誤提示使用者
                const checkSignup = _.omitBy(data.loginUser, (v) => !v);
                if (!checkSignup.Successful.state) {
                    alert.error(checkSignup.Successful.message);
                    return;
                }

                const { token, id, ...rest } = data.loginUser;
                const user = { id, ...rest };
                //儲存使用者
                setUser(user);
                setUserLoginState(true);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                //關閉視窗
                handleClose();
                //導入使用者頁面
                navigate(`/user/${id}`);
            } catch (error) {
                // 錯誤時導回首頁
                navigate('/');
                console.log(error);
            }
        },
        [LoginUser, handleClose, setUser, setUserLoginState]
    );

    //註冊
    const onSignupSubmit = React.useCallback(
        async (values, actions) => {
            console.log(actions);
            actions.setSubmitting(false);

            try {
                if (values.password !== values.verifyPwd) {
                    alert.error('請輸入相同的密碼');
                }
                const variables = {
                    input: {
                        email: values.email,
                        password: values.verifyPwd,
                    },
                };
                const { data, errors } = await SignupUser({ variables });
                if (errors) {
                    throw new Error(errors);
                }

                const checkSignup = _.omitBy(data.signupUser, (v) => !v);

                if (!checkSignup.Successful.state) {
                    alert.error(checkSignup.Successful.message);
                    return;
                }
                const { token, id, ...rest } = data.signupUser;
                const user = { id, ...rest };
                //儲存使用者
                setUser(user);
                setUserLoginState(true);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                //關閉視窗
                handleClose();
                //導入使用者頁面
                navigate(`/user/${id}`);
                // {...}
            } catch (error) {
                //導回首頁
                // {...}
                navigate('/');
                console.log(error);
            }
        },
        [SignupUser, handleClose, setUser, setUserLoginState]
    );

    return (
        <MTL.Modal
            className={classes.modal}
            open={show}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={show}>
                <MTL.Box className={classes.paper}>
                    {isLogin ? (
                        <FromikUserCom
                            initialValues={loginInitialValues}
                            validationSchema={loginValidationSchema}
                            textData={loginData}
                            isLogin={isLogin}
                            setIsLogin={setIsLogin}
                            onSubmit={onLoginSubmit}
                        />
                    ) : (
                        <FromikUserCom
                            initialValues={sigupInitialValues}
                            validationSchema={signupValidationSchema}
                            textData={signupData}
                            isLogin={isLogin}
                            setIsLogin={setIsLogin}
                            onSubmit={onSignupSubmit}
                        />
                    )}
                </MTL.Box>
            </Fade>
        </MTL.Modal>
    );
};

export default LoginUser;
