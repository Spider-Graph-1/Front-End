import React from 'react';
import { useEffect, useState } from 'react';
import axiosWithAuth from '../../api/utils/axiosWithAuth';
import {
  makeStyles,
  Box,
  Container,
  Paper,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: '1rem',
    marginLeft: '1rem',
    flexGrow: 1,
    padding: '1rem',
    paddingBlockEnd: '.5rem',
    borderBlockEnd: `2px solid ${theme.palette.primary.main}`,
  },
  textArea: {
    paddingTop: '1rem',
    margin: '.5rem 10%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
}));

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [green, setGreen] = useState(false);
  const [red, setRed] = useState(false);
  const [blue, setBlue] = useState(false);

  const [readyToSave, setReadyToSave] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axiosWithAuth()
      .get(`users/${localStorage.getItem('userId')}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (readyToSave) {
      axiosWithAuth()
        .put(`users/${localStorage.getItem('userId')}`, {
          username: userData.username,
          password: userData.password,
          name: userData.name,
          email: userData.email,
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setReadyToSave(false));
    }
  }, [
    readyToSave,
    userData.username,
    userData.password,
    userData.name,
    userData.email,
  ]);

  const setStatus = () => {
    setGreen(true);
  };
  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    console.log(userData);
  };
  const saveUsername = () => {
    setGreen(false);
    setReadyToSave(true);
  };
  const saveName = () => {
    setRed(false);
    setReadyToSave(true);
  };
  const saveEmail = () => {
    setBlue(false);
    setReadyToSave(true);
  };
  return (
    <Container maxWidth="sm">
      <Paper elevation={1}>
        <Box component="div" mt={18} py="1.5rem">
          <Typography variant="h3" align="center" className={classes.title}>
            User Information
          </Typography>
          <Box className={classes.textArea}>
            {!green ? (
              <Typography variant="h6">
                Username: {userData.username}
              </Typography>
            ) : (
              <Typography variant="h6">
                Username:{' '}
                <input
                  name="username"
                  type="text"
                  value={userData.username}
                  onChange={handleChange}
                />
              </Typography>
            )}
            <Button onClick={setStatus}>Edit</Button>
            {green ? (
              <Button color="primary" onClick={saveUsername}>
                Save
              </Button>
            ) : null}
          </Box>

          <Box className={classes.textArea}>
            {!red ? (
              <Typography variant="h6">Name: {userData.name}</Typography>
            ) : (
              <Typography variant="h6">
                Name:{' '}
                <input
                  name="name"
                  type="text"
                  value={userData.name}
                  onChange={handleChange}
                />
              </Typography>
            )}
            <Button
              onClick={() => {
                setRed(true);
              }}
            >
              Edit
            </Button>
            {red ? (
              <Button color="primary" onClick={saveName}>
                Save
              </Button>
            ) : null}
          </Box>

          <Box className={classes.textArea}>
            {!blue ? (
              <Typography variant="h6">Email: {userData.email}</Typography>
            ) : (
              <Typography variant="h6">
                Email:{' '}
                <input
                  required
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </Typography>
            )}
            <Button
              onClick={() => {
                setBlue(true);
              }}
            >
              Edit
            </Button>
            {blue ? (
              <Button color="primary" onClick={saveEmail}>
                Save
              </Button>
            ) : null}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
