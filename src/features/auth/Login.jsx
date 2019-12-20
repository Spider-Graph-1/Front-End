import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate, clearAuthenticationAttempt } from './authSlice';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  navButton: {
    margin: theme.spacing(1),
  },
  formField: {
    margin: theme.spacing(1.5),
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const initialFormValues = {
  username: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const { authenticating, success, error } = useSelector((state) => state.auth);

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const [formValues, setFormValues] = useState(initialFormValues);

  const toggleDrawer = useCallback(() => {
    setIsOpen(false);
    setFormValues(initialFormValues);
    dispatch(clearAuthenticationAttempt());
  }, [dispatch]);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authenticate(formValues));
  };

  useEffect(() => {
    if (success) {
      toggleDrawer();
    }
  }, [success, toggleDrawer]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="contained"
        color="secondary"
        className={classes.navButton}
      >
        Login
      </Button>

      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
        <Box py="1.5rem">
          <Typography
            variant="h4"
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
            <Box display="flex" justifyContent="space-evenly">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={authenticating}
                className={classes.navButton}
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
                onClick={toggleDrawer}
                variant="contained"
                color="secondary"
                className={classes.navButton}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Login;
