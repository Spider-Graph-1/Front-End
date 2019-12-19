// React
import React from 'react';
// UI
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
// Routing
import { Link as RouterLink } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import Login from '../features/auth/login/Login';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontSize: '1.125rem',
  },
  navButton: {
    margin: theme.spacing(1),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Spider Graph
        </Typography>

        {authenticated ? (
          <Button variant="outlined" color="primary">
            Logout
          </Button>
        ) : (
          <>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              color="primary"
              className={classes.navButton}
            >
              Register
            </Button>

            <Login />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
