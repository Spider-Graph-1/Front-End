import axios from 'axios';

export const requestRegistration = async (user) => {
  const {
    data: { user_id: userId, token },
    ...rest
  } = await axios.post(
    'https://spidergraph-backend.herokuapp.com/api/auth/register',
    user
  );

  return { userId, token, rest };
};

export const requestLogin = async (user) => {
  const {
    data: { user_id: userId, token },
    ...rest
  } = await axios.post(
    'https://spidergraph-backend.herokuapp.com/api/auth/login',
    user
  );

  return { userId, token, rest };
};
