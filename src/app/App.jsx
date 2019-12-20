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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
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
            color="textPrimary"
            align="center"
            className={classes.title}
          >
            Spider Graph
          </Typography>
        )}
        <Container maxWidth="sm">
          <Switch>
            <Route
              exact
              path="/"
              component={returningUser ? Login : Register}
            />
            <PrivateRoute exact path="/dashboard" component={BrettApp} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
