import React from 'react';
import { GETME, GETUSERS } from '../graphql';
import { useQuery } from '@apollo/client';
const UserContext = React.createContext();
const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [userLoginState, setUserLoginState] = React.useState(false);
    const { data: getMeData } = useQuery(GETME);

    React.useEffect(() => {
        if (!localStorage.getItem('token')) {
            localStorage.clear();
            setUser(null);
            setUserLoginState(false);
        } else {
            setUser(getMeData?.getMe || {});
        }
    }, [getMeData]);
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                userLoginState,
                setUserLoginState,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => [React.useContext(UserContext).user, React.useContext(UserContext).setUser];

const useLoginState = () => [
    React.useContext(UserContext).userLoginState,
    React.useContext(UserContext).setUserLoginState,
];

// 登出後清除使用這資料
const useHandleClearToken = () => {
    const [, setUser] = useUser();
    const [, setUserLoginState] = useLoginState();

    const handle = () => {
        localStorage.clear();
        setUser(null);
        setUserLoginState(false);
    };
    return () => handle();
};

//獲取當前使用者資料

export { UserProvider, useUser, useLoginState, useHandleClearToken };
