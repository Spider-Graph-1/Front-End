// React
import React from 'react';
// UI
import { ThemeProvider, CssBaseline, Container } from '@material-ui/core';
// Routing
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from '../features/auth/PrivateRoute';
// Theme
import theme from './theme';
// Navbar
import Navbar from './Navbar';
// Components
import ViewDashboard from '../features/dashboard/view/ViewDashboard';
// import ViewGraph from '../features/graph/ViewGraph';
import BrettApp from './Brett/BrettApp';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Navbar />
      <Container>
        {/* <ViewGraph />*/}
        <BrettApp />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={ViewDashboard} />
        </Switch>
      </Container>
    </Router>
  </ThemeProvider>
);

export default App;
