// React
import React from 'react';
// UI
import { Box, AppBar, Toolbar, Button, makeStyles } from '@material-ui/core';
// Routing
import { Link as RouterLink } from 'react-router-dom';
// Components
import Logout from '../features/auth/Logout';
import logo from '../assets/logo.png';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  logo: {
    height: '50px',
  },

  navButton: {
    margin: '1rem',
  },

  navProfile: {
    margin: '.2rem',
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="secondary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <img src={logo} alt="Spider Graph Logo" className={classes.logo} />
        <Box>
          <Button
            to="/profile"
            component={RouterLink}
            className={classes.navProfile}
            color="inherit"
          >
            Profile
          </Button>
          <Button
            to="/dashboard"
            component={RouterLink}
            className={classes.navButton}
            color="inherit"
          >
            Dashboard
          </Button>
          <Logout />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
