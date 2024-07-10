import axiosClient from "../axiosClient.js";

export const about = () => {
    const url = `/about`;
    return axiosClient.get(url);
};

export const saveAbout = (params) => {
    const url = `admin/about/save`;
    return axiosClient.post(url, params);
};