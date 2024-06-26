import axiosClient from "./axiosClient.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { StorageKeys } from "../key/keys.js";

export const register = (registerRequest) => {
    const url = "/auth/register";
    return axiosClient.post(url, registerRequest);
};

export const verifyEmail = (registerRequest) => {
    const url = "/auth/confirm-email";
    return axiosClient.post(url, registerRequest);
};

export const authenticate = async (authenticateRequest) => {
    try {
        const url = "auth/authenticate";
        const response = await axiosClient.post(url, authenticateRequest);

        const { access_token, name, role } = response.data;
        const decodedToken = jwtDecode(access_token);
        const expirationTime = decodedToken.exp * 1000;

        Cookies.set(StorageKeys.ACCESS_TOKEN, access_token, { expires: new Date(expirationTime) });
        localStorage.setItem(StorageKeys.USER_NAME, name);
        localStorage.setItem(StorageKeys.USER_ROLE, role);

        return response;
    } catch (error) {
        console.error("Authenticate: ", error);
        throw error;
    }
};