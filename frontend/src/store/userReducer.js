import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    accessToken: null,
    username: '',
    role: '',
    appliedJobs: [],
    postedJobs: [],
  },
  reducers: {
    login: (state, action) => {
      const { accessToken, name, role, appliedJobs, postedJobs } = action.payload;
      state.isLoggedIn = true;
      state.accessToken = accessToken;
      state.username = name;
      state.role = role;
      state.appliedJobs = appliedJobs;
      state.postedJobs = postedJobs;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.username = '';
      state.role = '';
      state.appliedJobs = [];
      state.postedJobs = [];
    },
    addAppliedJob: (state, action) => {
      state.appliedJobs.push(action.payload);
    },
    addPostedJob: (state, action) => {
      state.postedJobs.push(action.payload);
    },
  },
});

export const { login, signOut, addAppliedJob, addPostedJob } = userSlice.actions;

export default userSlice.reducer;