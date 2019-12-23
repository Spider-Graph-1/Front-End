// React
import React from 'react';
// UI
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
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
import BrettApp from './Brett/BrettApp';
import Register from '../features/auth/Register';
import Login from '../features/auth/Login';
import ViewGraph from '../features/graph/ViewGraph';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    padding: '3rem',
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
          <Typography
            variant="h1"
            color="textSecondary"
            align="center"
            className={classes.title}
          >
            Spider Graph
          </Typography>
        )}
        <Container>
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
            <PrivateRoute exact path="/dashboard" component={BrettApp} />
            <PrivateRoute exact path="/graph-demo" component={ViewGraph} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
