import { createSlice } from '@reduxjs/toolkit';
import { requestRegistration, requestAuthentication } from '../../api/auth';

const initialState = {
  authenticating: false,
  authenticated: false,
  success: null,
  error: null,
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
        error: null,
        authenticating: false,
      };
    },
    authenticateUserError(state, action) {
      return {
        ...state,
        success: null,
        error: JSON.parse(action.payload),
        authenticating: false,
      };
    },
    unAuthenticateUser(state) {
      return {
        ...state,
        authenticated: false,
        success: null,
        error: null,
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
