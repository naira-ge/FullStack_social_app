import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from 'axios';


const rootUrl = "http://localhost:8800/api/";

const loginUrl = rootUrl + "users/login";
const getUserUrl = rootUrl + "users";
const logoutUrl = rootUrl + "users/logout";
const newAccessJWT = rootUrl + "tokens";

const registerUrl = rootUrl + "auth/register";
const userProfileUrl = rootUrl + "users/";
const userUpdateUrl = rootUrl + "users/";
const refreshAccessJWT = rootUrl + "/refresh";


const userVerificationUrl = userProfileUrl + "/verify";


export const userLogin = (frmData) => {

    return new Promise(async (resolve, reject) => {

        try {
            const res = await axios.post(loginUrl, frmData);
            resolve(res.data);

            if (res.data.status === "success") {
                sessionStorage.setItem("accessJWT", res.data.accessJWT);
                localStorage.setItem(
                    "TalentHouse",
                    JSON.stringify({ refreshJWT: res.data.refreshJWT })
                );
            }

        } catch (error) {
            reject(error.message);
        }
    });
};

export const fetchUser = () => {
    return new Promise(async (resolve, reject) => {
    try {
        const accessJWT = sessionStorage.getItem("accessJWT");

        if (!accessJWT) {
        reject("Token not found!");
        }

        const res = await axios.get(getUserUrl, {
        headers: {
            Authorization: accessJWT,
        },
        });

        console.log('fetchUser', res.data);
        resolve(res.data);
    } catch (error) {
      reject(error.message);
    }
  });
};


export const fetchNewAccessJWT = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const { refreshJWT } = JSON.parse(localStorage.getItem("TalentHouse"));

            if (!refreshJWT) {
            reject("Token not found!");
        }

        const res = await axios.get(newAccessJWT, {
            headers: {
                Authorization: refreshJWT,
            },
        });

        if (res.data.status === "success") {
            sessionStorage.setItem("accessJWT", res.data.accessJWT);
        }

        resolve(true);
    } catch (error) {
        if (error.message === "Request failed with status code 403") {
            localStorage.removeItem("TalentHouse");
            localStorage.removeItem("refreshToken");
        }
        reject(false);
    }
});
};

export const userLogout = async () => {
    try {
        await axios.delete(logoutUrl, {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
            },
        });
    } catch (error) {
      console.log(error.message);
    }
};

export const updateUser = async (editFields) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.patch(getUserUrl,  editFields, {
            headers: {
                Authorization: sessionStorage.getItem("accessJWT"),
            },
        });
            resolve(result);
        
        } catch (error) {
            reject(error.message);
        }
    });
};


export const registerUser = (frmData) => {

    /*return new Promise(async (resolve, reject) => {

        try {
            const res = await axios.post(registerUrl, frmData);
            console.log("Register User.", res.data);
            resolve(res);

            if (res.statusText === "OK") {
                sessionStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem(
                    "TalentHouse",
                    JSON.stringify({ refreshToken: res.data.refreshToken })
                );
            }

        } catch (error) {
            console.log(error.message);
            reject(error.message);
        }
    });*/
};


