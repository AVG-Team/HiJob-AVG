import axiosClient from "./axiosClient.js";

export const getUser = (email) => {
    const url = `/user/getUser/${email}`;
    return axiosClient.get(url, { email });
};

export const profile = () => {
    const url = "/user/profile";
    return axiosClient.get(url);
};

export const getAllSkills = () => {
    const url = "/skill/all";
    return axiosClient.get(url);
};

export const updateJobStatus = (jobStatus) => {
    const url = "/user/update-status";
    return axiosClient.post(url, jobStatus);
};

export const updateAvatar = (avatar) => {
    const url = "/user/update-avatar";
    return axiosClient.post(url, avatar, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateUserInfo = (userInfo) => {
    const url = "/user/update-profile";
    return axiosClient.post(url, userInfo, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const changePassword = (passwordRequest) => {
    const url = "user/change-password";
    return axiosClient.post(url, passwordRequest);
};
