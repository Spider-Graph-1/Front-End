import { createSlice } from '@reduxjs/toolkit';
import { requestRegistration, requestLogin } from '../../api/auth';

const initialState = {
  authenticating: false,
  authenticated: !!localStorage.getItem('token'),
  returningUser: false,
  success: null,
  error: null,
  userId: JSON.parse(localStorage.getItem('userId'))
    ? JSON.parse(localStorage.getItem('userId'))
    : null,
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
      const [success, userId] = action.payload;

      return {
        ...state,
        authenticated: true,
        success: JSON.parse(success),
        error: null,
        authenticating: false,
        userId,
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
        returningUser: true,
        success: null,
        error: null,
      };
    },
    setReturningUser(state, action) {
      return {
        ...state,
        returningUser: action.payload,
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
  setReturningUser,
} = authenticateUser.actions;

export default authenticateUser.reducer;

export const register = (user) => async (dispatch) => {
  dispatch(authenticatingUser());
  try {
    const registrationResponse = await requestRegistration(user);
    localStorage.setItem('token', registrationResponse.token);
    localStorage.setItem('userId', registrationResponse.userId);
    dispatch(
      authenticateUserSuccess([
        JSON.stringify(registrationResponse.rest),
        registrationResponse.userId,
      ])
    );
  } catch (error) {
    dispatch(authenticateUserError(JSON.stringify(error)));
  }
};

export const login = (user) => async (dispatch) => {
  dispatch(authenticatingUser());
  try {
    const loginResponse = await requestLogin(user);
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('userId', loginResponse.userId);
    dispatch(
      authenticateUserSuccess([
        JSON.stringify(loginResponse.rest),
        loginResponse.userId,
      ])
    );
  } catch (error) {
    dispatch(authenticateUserError(JSON.stringify(error)));
  }
};

export const unAuthenticate = () => (dispatch) => {
  localStorage.clear();
  dispatch(unAuthenticateUser());
};
