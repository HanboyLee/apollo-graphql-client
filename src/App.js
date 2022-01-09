//pages
// import { PokemonTemplate } from './pages';
// import Userpage from './pages/User';
// import Homepage from './pages/Home';
//icons
// import PokeballIcon from './assets/Icons/pokeball.js';
import { ThemeProvider } from '@material-ui/core/styles';
import { AccountCircleRounded, HomeRounded } from '@material-ui/icons';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//components
import { Navbar } from './components';
import theme from './configs/theme';
//hooks
import { useLoginState, useUser } from './hooks/useUserHelper';

// import Post from './components/Post';
const Userpage = React.lazy(() => import('./pages/User'));
const Homepage = React.lazy(() => import('./pages/Home'));
const withSupense = (ele) => {
    return <React.Suspense fallback={<div>Loading...</div>}>{ele}</React.Suspense>;
};

function App() {
    const [loginState] = useLoginState();
    const [user] = useUser();

    //For NavLink
    const routeConfig = React.useMemo(() => {
        const defaultParams = [
            {
                key: 'home',
                name: '首頁',
                Icon: HomeRounded,
                to: '/',
            },
            { key: 'user', name: '使用者', to: `/user/${user?.id}`, Icon: AccountCircleRounded, state: !loginState },
        ];
        return defaultParams;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginState]);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <React.Fragment>
                    <Routes>
                        <Route path="/" element={withSupense(<Navbar routeConfig={routeConfig} />)}>
                            <Route index element={withSupense(<Homepage />)} />
                            <Route path={'/user/:id'} element={withSupense(<Userpage />)} />
                        </Route>
                    </Routes>
                </React.Fragment>
            </Router>
        </ThemeProvider>
    );
}

export default App;
