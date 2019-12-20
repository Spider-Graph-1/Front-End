import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { unAuthenticate } from './authSlice';

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => dispatch(unAuthenticate())}
    >
      Logout
    </Button>
  );
};

export default Logout;
