import { getUserPending, getUserSuccess, getUserFail, getUserUpdateStart, getUserUpdate, getUserUpdateFail, getUserRemove } from './usersSlice';

import { fetchUser, updateUser, registerUser } from '../../api/usersApi';



export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch(getUserPending());

            const result = await fetchUser();

            if (result.user && result.user._id) {
                return dispatch(getUserSuccess(result.user));
            }
         dispatch(getUserFail("User is not found!"));

    } catch (error) {
        dispatch(getUserFail(error.message));
    }
};

export const updateUserProfile = (editFields) => async (dispatch) => {
    dispatch(getUserUpdateStart());

    try {    
            const result = await updateUser(editFields);
            console.log('UpdateUser res.', result);

            if (result.status === "error") {
                return dispatch(getUserUpdateFail("User is not found!"));
            };

            return dispatch(getUserSuccess(result.data));

    } catch (error) {
        dispatch(getUserUpdateFail(error.message));
    }
};

export const registerNewUser = (info) => async (dispatch) => {
    dispatch(getUserPending());

    try {
        const result = await registerUser(info);
            console.log('register res.', result);

            if (result.status === "error") {
                return dispatch(getUserUpdateFail("Try again can't create account"));
            };

            return dispatch(getUserSuccess(result.data));
            
    } catch (error) {
        dispatch(getUserFail(error.message));
    }
};