// React
import React from 'react';
// UI
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  makeStyles,
} from '@material-ui/core';
// Routing
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from '../features/auth/PrivateRoute';
// Theme
import theme from './theme';
// Navbar
import Navbar from './Navbar';
// Components
// import BrettApp from './Brett/BrettApp';
import Register from '../features/auth/Register';
import Login from '../features/auth/Login';
import ViewGraph from '../features/graph/view/ViewGraph';
import ViewDashboard from '../features/dashboard/ViewDashboard';
import Profile from './Brett/Profile';
import logo from '../assets/logo.png';

const useStyles = makeStyles(() => ({
  logoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.main,
  },

  logo: {
    padding: '3rem 0',
  },

  appContainer: {
    marginTop: '3rem',
  },
}));

const App = () => {
  const { authenticated, returningUser } = useSelector((state) => state.auth);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {authenticated ? (
          <Navbar />
        ) : (
          <Box className={classes.logoContainer}>
            <img src={logo} alt="Spider Graph Logo" className={classes.logo} />
          </Box>
        )}
        <Container className={classes.appContainer}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (authenticated) {
                  return <Redirect to="/dashboard" />;
                }
                if (returningUser) {
                  return <Login />;
                }
                return <Register />;
              }}
            />
            <PrivateRoute exact path="/dashboard" component={ViewDashboard} />
            <PrivateRoute exact path="/graph" component={ViewGraph} />
            <PrivateRoute path="/graphs/:id" component={ViewGraph} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
