import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  TextField,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    margin: theme.spacing(1),
  },
  navButton: {
    margin: theme.spacing(1),
  },
  formField: {
    margin: theme.spacing(1),
  },
}));

const initialFormValues = {
  username: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.auth);

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formValues, setFormValues] = useState(initialFormValues);

  const toggleDrawer = () => {
    setIsOpen(false);
    setFormValues(initialFormValues);
  };

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
    if (error) {
      setErrorMessage('Login failed.');
    }
  }, [error, success]);

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
              name="username"
              value={formValues.username}
              label="Username"
              helperText={errorMessage}
              variant="filled"
              onChange={handleChange}
              className={classes.formField}
            />
            <TextField
              required
              name="password"
              type="password"
              value={formValues.password}
              label="Password"
              helperText={errorMessage}
              variant="filled"
              onChange={handleChange}
              className={classes.formField}
            />
            <Box display="flex" justifyContent="space-evenly">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.navButton}
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
