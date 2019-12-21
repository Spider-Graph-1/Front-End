import React, { useEffect, useState } from 'react';
import {
  Fade,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  Grow,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { register, setReturningUser } from './authSlice';
import useAuthForm from './useAuthForm';

const initialFormValues = {
  firstName: '',
  email: '',
  username: '',
  password: '',
};

const Register = () => {
  const {
    authenticating,
    error,
    handleChange,
    formValues,
    dispatch,
    classes,
  } = useAuthForm(initialFormValues);
  const [passwordProgress, setPasswordProgress] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (formValues.password.length > 0 && formValues.password.length < 6) {
      setPasswordProgress(formValues.password.length * (100 / 6));
    } else if (formValues.password.length >= 6) {
      setPasswordProgress(100);
      setPasswordError(null);
    } else {
      setPasswordProgress(null);
    }
  }, [formValues.password.length]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const toTitleCase = (str) =>
      str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );

    if (passwordProgress === 100) {
      dispatch(
        register({
          ...formValues,
          firstName: toTitleCase(formValues.firstName),
        })
      );
    } else {
      setPasswordError('Password must be at least 6 characters long.');
    }
  };

  return (
    <Fade in timeout={300}>
      <Paper className={classes.paper}>
        <Box py="1.5rem">
          <Typography variant="h3" align="center" className={classes.title}>
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
              autoFocus
              error={error && true}
              name="firstName"
              value={formValues.firstName}
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
              value={formValues.email}
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
              value={formValues.username}
              label="Username"
              helperText={error && 'Registration Failed'}
              variant="filled"
              color="secondary"
              onChange={handleChange}
              className={classes.formField}
            />
            <TextField
              required
              placeholder="Must be at least 6 characters"
              error={(passwordError && true) || (error && true)}
              name="password"
              type="password"
              value={formValues.password}
              label="Password"
              helperText={passwordError || (error && 'Registration Failed')}
              variant="filled"
              color="secondary"
              onChange={handleChange}
              className={classes.formField}
            />

            {passwordProgress && (
              <Fade in>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mx="15%"
                  alignItems="center"
                  flexShrink={0}
                >
                  <LinearProgress
                    color={passwordProgress === 100 ? 'secondary' : 'primary'}
                    variant="determinate"
                    value={passwordProgress}
                    className={classes.progressBar}
                  />
                  {passwordProgress === 100 && (
                    <Grow in>
                      <CheckIcon
                        color="secondary"
                        className={classes.checkIcon}
                      />
                    </Grow>
                  )}
                </Box>
              </Fade>
            )}

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
                onClick={() => dispatch(setReturningUser(true))}
                size="small"
                className={classes.formButton}
              >
                Already have an account?
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default Register;
