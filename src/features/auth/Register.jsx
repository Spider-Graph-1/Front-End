import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { register } from './authSlice';
import useAuthForm from './useAuthForm';

const initialFormValues = {
  firstName: '',
  email: '',
  username: '',
  password: '',
};

const Register = ({ setReturningUser }) => {
  const {
    authenticating,
    error,
    handleChange,
    formValues,
    dispatch,
    classes,
  } = useAuthForm(initialFormValues);

  const handleSubmit = (event) => {
    event.preventDefault();

    const toTitleCase = (str) =>
      str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );

    dispatch(
      register({ ...formValues, firstName: toTitleCase(formValues.firstName) })
    );
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
          Register
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
            name="firstName"
            defaultValue={formValues.firstName}
            label="First Name"
            helperText={error && 'Registration Failed'}
            variant="filled"
            color="secondary"
            onChange={handleChange}
            className={classes.formField}
          />
          <TextField
            required
            error={error && true}
            name="email"
            type="email"
            defaultValue={formValues.email}
            label="Email"
            helperText={error && 'Registration Failed'}
            variant="filled"
            color="secondary"
            onChange={handleChange}
            className={classes.formField}
          />
          <TextField
            required
            error={error && true}
            name="username"
            defaultValue={formValues.username}
            label="Username"
            helperText={error && 'Registration Failed'}
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
            helperText={error && 'Registration Failed'}
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
              Register
            </Button>
            <Button
              onClick={() => setReturningUser(true)}
              size="small"
              className={classes.formButton}
            >
              Already have an account?
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Register;
