import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLoading: false,
  error: '',
  updatePending: false,
  updateError: '',
}


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.error = '';
    },
    getUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    getUserUpdateStart: (state) => {
      state.updatePending = true;
    },
    getUserUpdate: (state, { payload }) => {
      state.updatePending = false;
      state.user = payload;
    },
    getUserUpdateFail: (state, { payload }) => {
      state.updatePending = false;
      state.updateError = payload;
    },
    getUserRemove: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = usersSlice;

export const { getUserPending, getUserSuccess, getUserFail, getUserUpdateStart, getUserUpdate, getUserUpdateFail, getUserRemove } = actions;

export default reducer;
