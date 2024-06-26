import { StorageKeys } from '../key/keys.js';
import Cookies from "js-cookie";

export const getUserInfo = () => {
    const name = localStorage.getItem(StorageKeys.USER_NAME);
    const role = localStorage.getItem(StorageKeys.USER_ROLE);
    return { name, role };
};

export const checkAuth = () => {
    console.log(213124);
    return !!Cookies.get(StorageKeys.ACCESS_TOKEN);
}