// React
import React from 'react';
// UI
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
} from '@material-ui/core';
// Routing
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from '../features/auth/PrivateRoute';
// Theme
import theme from './theme';
// Dashboard
import Dashboard from '../features/dashboard/view/Dashboard';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container>
      <Typography align="center" color="textPrimary" variant="h1">
        Spider Graph
      </Typography>

      <Router>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Container>
  </ThemeProvider>
);

export default App;
