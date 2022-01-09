import React from 'react';
const Context = React.createContext({ name: 'han' });
export const MediaProvider = ({ children }) => {
    return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export const withMedia = (Component) => {
    return (props) => {
        return (
            <MediaProvider>
                <Component {...props} />
            </MediaProvider>
        );
    };
};
