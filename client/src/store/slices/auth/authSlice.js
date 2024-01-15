import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "offline",
    user: {},
    errorMessage: null,
    resetPasswordMessage: null,
  },
  reducers: {
    login: (state, action) => {
        state.status = "online";
        state.user = action.payload;
    },
    logout: (state, action) => {
      state.status = "offline";
      state.user = {};
      state.errorMessage = action.payload
    },
    checkingCredentials: (state, action) => {
      state.status = 'checking';
      
    },
    checkingGoogleCredentials: (state, action) => {
      state.status = 'checking';
    },
    resetPasswordEmail: ( state, action) => {
      state.resetPasswordMessage = action.payload
    }
  },
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials, checkingGoogleCredentials, resetPasswordEmail } =  authSlice.actions;