import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { authenticate, setReturningUser } from './authSlice';
import useAuthForm from './useAuthForm';

const initialFormValues = {
  username: '',
  password: '',
};

const Login = () => {
  const {
    dispatch,
    formValues,
    error,
    handleChange,
    authenticating,
    classes,
  } = useAuthForm(initialFormValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authenticate(formValues));
  };

  return (
    <Paper className={classes.paper}>
      <Box py="1.5rem">
        <Typography
          variant="h3"
          color="textPrimary"
          align="center"
          className={classes.title}
        >
          Login
        </Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            error={error && true}
            name="username"
            defaultValue={formValues.username}
            label="Username"
            helperText={error && 'Login Failed'}
            variant="filled"
            color="secondary"
            onChange={handleChange}
            className={classes.formField}
          />
          <TextField
            required
            error={error && true}
            name="password"
            type="password"
            defaultValue={formValues.password}
            label="Password"
            helperText={error && 'Login Failed'}
            variant="filled"
            color="secondary"
            onChange={handleChange}
            className={classes.formField}
          />
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={authenticating}
              className={classes.formButton}
              startIcon={
                authenticating && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )
              }
            >
              Submit
            </Button>
            <Button
              onClick={() => dispatch(setReturningUser(false))}
              variant="contained"
              color="secondary"
              className={classes.formButton}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;
