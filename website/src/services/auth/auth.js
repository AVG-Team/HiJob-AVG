import { StorageKeys } from "../key/keys.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getUserInfo = () => {
    const name = localStorage.getItem(StorageKeys.USER_NAME);
    const role = localStorage.getItem(StorageKeys.USER_ROLE);
    const token = Cookies.get(StorageKeys.ACCESS_TOKEN);
    return { name, role, token };
};

export const checkAuth = () => {
    return !!Cookies.get(StorageKeys.ACCESS_TOKEN);
};

export const setToken = (token, name, role) => {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;

    Cookies.set(StorageKeys.ACCESS_TOKEN, token, { expires: new Date(expirationTime) });
    localStorage.setItem(StorageKeys.USER_NAME, name);
    localStorage.setItem(StorageKeys.USER_ROLE, role);
};
