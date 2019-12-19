import { createSlice } from '@reduxjs/toolkit';
import { requestRegistration, requestAuthentication } from '../../api/auth';

const initialState = {
  authenticating: false,
  authenticated: false,
  success: {},
  error: {},
};

const authenticateUser = createSlice({
  name: 'authenticateUser',
  initialState,
  reducers: {
    authenticatingUser(state) {
      return {
        ...state,
        authenticating: true,
      };
    },
    authenticateUserSuccess(state, action) {
      return {
        ...state,
        authenticated: true,
        success: JSON.parse(action.payload),
        authenticating: false,
      };
    },
    authenticateUserError(state, action) {
      return {
        ...state,
        authenticating: false,
        error: JSON.parse(action.payload),
      };
    },
    unAuthenticateUser(state) {
      return {
        ...state,
        authenticated: false,
      };
    },
  },
});

export const {
  authenticatingUser,
  authenticateUserSuccess,
  authenticateUserError,
  unAuthenticateUser,
} = authenticateUser.actions;

export default authenticateUser.reducer;

export const authenticate = (username, password) => async (dispatch) => {
  dispatch(authenticatingUser());
  try {
    const login = await requestAuthentication(username, password);
    localStorage.setItem('token', login.data.payload);
    dispatch(authenticateUserSuccess(JSON.stringify(login)));
  } catch (error) {
    dispatch(authenticateUserError(JSON.stringify(error)));
  }
};

export const register = (user) => async (dispatch) => {
  dispatch(authenticatingUser());
  try {
    await requestRegistration(user);
    dispatch(authenticate(user.username, user.password));
  } catch (error) {
    dispatch(authenticateUserError(JSON.stringify(error)));
  }
};

export const unAuthenticate = () => (dispatch) => {
  localStorage.clear();
  dispatch(unAuthenticateUser());
};
