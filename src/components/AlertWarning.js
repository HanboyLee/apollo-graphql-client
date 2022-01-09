import * as LAB from '@material-ui/lab';
import React from 'react';

const serverities = {
    Error: 'error',
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
};
const AlertWarning = ({ isError, titleNotity = '提醒', notity = '提示錯誤資料', severity = serverities }) => {
    const [show, setShow] = React.useState(isError);

    React.useEffect(() => {
        let timer;
        if (show) {
            timer = setInterval(() => {
                setShow(false);
            }, 2000);
        }
        return () => (timer = null);
    }, [show]);
    return (
        <>
            {show && (
                <LAB.Alert severity={severity}>
                    <LAB.AlertTitle>{titleNotity}</LAB.AlertTitle>
                    <strong>{notity}</strong>
                </LAB.Alert>
            )}
        </>
    );
};

export default AlertWarning;
