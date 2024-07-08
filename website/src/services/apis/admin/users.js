import axiosClient from "../axiosClient.js";

export const getAll = (params) => {
    const url = "/admin/users";
    return axiosClient.get(url, {params});
};