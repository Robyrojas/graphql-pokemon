import React, { Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = (props) => {

    return (
        <Fragment>
            <CssBaseline />
            <AppBar position="relative" color="primary">
                <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Lista de Pokemon
                </Typography>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

export default Header;