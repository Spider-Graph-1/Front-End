import React from 'react';
import { useEffect } from 'react';
import axiosWithAuth from '../../api/utils/axiosWithAuth';
const Profile = () => {
  useEffect(() => {
    axiosWithAuth()
      .get('/user/4')
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>This is where we will build out the profile.</h1>
    </div>
  );
};

export default Profile;
