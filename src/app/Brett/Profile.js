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
  const classes = useStyles();

  useEffect(() => {
    axiosWithAuth()
      .get(`users/${localStorage.getItem('userId')}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  
  return (
    <Container maxWidth="sm">
      <Paper elevation={1}>
        <Box component="div" mt={18} py="1.5rem">
          <Typography variant="h3" align="center" className={classes.title}>
            User Information
          </Typography>
          <Box className={classes.textArea}>
            <Typography variant="h6">Username: {userData.username}</Typography>
            <Button>Edit</Button>
          </Box>
          <Box className={classes.textArea}>
            <Typography variant="h6">Name: {userData.name}</Typography>
            <Button>Edit</Button>
          </Box>
          <Box className={classes.textArea}>
            <Typography variant="h6">Email: {userData.email}</Typography>
            <Button>Edit</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
