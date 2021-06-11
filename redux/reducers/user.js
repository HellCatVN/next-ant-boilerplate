import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    isLoggedIn: false,
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    userLogOut: (state, action) => {
      state.isLoggedIn = false;
      state.userInfo = {};
    },
    userUpdateInfo: (state, action) => {
      state.userInfo.email = action.payload.email;
      state.userInfo.displayName = action.payload.displayName;
    },
    userUpdateAvatar: (state, action) => {
      state.userInfo.avatar = action.payload.avatar;
    },
  },
});

export const {
  userLoggedIn,
  userLogOut,
  userUpdateInfo,
  userUpdateAvatar,
} = userSlice.actions;
export default userSlice.reducer;
