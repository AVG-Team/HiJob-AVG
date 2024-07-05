import axiosClient from "./axiosClient.js";
import {setToken} from "../auth/auth.js";

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
        setToken(access_token, name, role);

        return response;
    } catch (error) {
        console.error("Authenticate: ", error);
        throw error;
    }
};

export const authenticateAdmin = async (authenticateRequest) => {
    try {
        const url = "auth/authenticate";
        const response = await axiosClient.post(url, authenticateRequest);

        const { access_token, name, role } = response.data;
        if (role !== "ADMIN") {
            throw new Error("You are not an admin");
        }
        setToken(access_token, name, role);

        return response;
    } catch (error) {
        console.error("Authenticate: ", error);
        throw error;
    }
};

export const getCurrentUser = async (request) => {
    try {
        const url = "auth/get-current-user";
        const response = await axiosClient.post(url, request);

        console.log(response)

        const { name, role } = response.data;
        setToken(request.token, name, role);

        return response;
    } catch (error) {
        console.error("Authenticate: ", error);
        throw error;
    }
}

export const forgotPassword = (forgotPasswordRequest) => {
    const url = "/auth/forgot-password";
    return axiosClient.post(url, forgotPasswordRequest);
}

export const changePassword = (changePasswordRequest) => {
    const url = "/auth/change-password";
    return axiosClient.post(url, changePasswordRequest);
}