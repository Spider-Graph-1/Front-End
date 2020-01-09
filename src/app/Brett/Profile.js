import React from 'react';
import { useEffect, useState } from 'react';
import tempAxiosBrett from '../../api/utils/tempAxiosBrett';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 10%;
`;
const Profile = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    tempAxiosBrett()
      .get('/users/1')
      .then((response) => {
        console.log(response);
        setUserData(response.data);
      })

      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);
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
