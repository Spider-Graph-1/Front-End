import axiosWithAuth from './utils/axiosWithAuth';

export const requestRegistration = (user) =>
  axiosWithAuth().post('/register', {
    user,
  });

export const requestAuthentication = (username, password) =>
  axiosWithAuth().post('/login', {
    username,
    password,
  });
