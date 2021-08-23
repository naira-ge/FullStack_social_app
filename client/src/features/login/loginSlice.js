import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingLogIn: false,
    isAuth: false,
    errorLogIn: '',
    isLoadingRegister: false,
    isAuthRegister:false,
    errorRegister: '',
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginPending: (state) => {
            state.isLoadingLogIn = true;
        },
        loginSuccess: (state) => {
            state.isLoadingLogIn = false;
            state.isAuth = true;
            state.errorLogIn = '';
        },
        loginFail: (state, {payload}) => {
            state.isLoadingLogIn = false;
            state.errorLogIn = payload;
        },
        registerPending: (state) => {
            state.isLoadingRegister = true;
        },
        registerSuccess: (state, {payload}) => {
            state.isLoadingRegister = false;
            state.isAuthRegister = true;
            state.errorRegister = '';
        },
        registerFail: (state, {payload}) => {
            state.isLoadingRegister = false;
            state.errorRegister = payload;
        },
    }
});

const { reducer, actions } = loginSlice;

export const { loginPending, loginSuccess, loginFail, registerPending, registerSuccess, registerFail } = actions;

export default reducer;