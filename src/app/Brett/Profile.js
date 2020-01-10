import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../../api/utils/axiosWithAuth';

const Div = styled.div`
  margin-top: 10%;
`;
const Profile = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axiosWithAuth()
      .get(`users/${localStorage.getItem('userId')}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Div>
      <h1>Username: {userData.username}</h1>
      <h1>Name: {userData.name}</h1>
      <h1>Email: {userData.email}</h1>
      <h1>Password: {userData.password}</h1>
    </Div>
  );
};

export default Profile;
