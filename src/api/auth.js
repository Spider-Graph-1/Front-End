import axiosWithAuth from './utils/axiosWithAuth';

export const requestRegistration = (username, password, firstName, lastName) =>
  axiosWithAuth().post('/register', {
    username,
    password,
    firstName,
    lastName,
  });

export const requestAuthentication = (username, password) =>
  axiosWithAuth().post('/login', {
    username,
    password,
  });
