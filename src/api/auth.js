import axiosWithAuth from './utils/axiosWithAuth';

export const requestRegistration = (user) =>
  axiosWithAuth().post('/auth/register', {
    user,
  });

export const requestAuthentication = (username, password) =>
  axiosWithAuth().post('/auth/login', {
    username,
    password,
  });
