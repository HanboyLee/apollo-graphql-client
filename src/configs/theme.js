import { createTheme } from '@material-ui/core/styles';
import * as CLR from '@material-ui/core/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: CLR.lime[300],
        },
        secondary: {
            main: CLR.orange[500],
        },
    },
});

export default theme;
