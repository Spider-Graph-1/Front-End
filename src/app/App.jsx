import React from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
} from '@material-ui/core';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container>
      <Typography align="center" color="textPrimary" variant="h1">
        Spider Graph
      </Typography>
    </Container>
  </ThemeProvider>
);

export default App;
