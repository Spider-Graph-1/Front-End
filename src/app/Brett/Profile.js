import React from 'react';
import { useEffect } from 'react';
import axiosWithAuth from '../../api/utils/axiosWithAuth';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 10%;
`;
const Profile = () => {
  useEffect(() => {
    axiosWithAuth()
      .get('/user/4')
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Div>
      <h1>This is where we will build out the profile.</h1>
    </Div>
  );
};

export default Profile;
