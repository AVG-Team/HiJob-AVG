import axiosClient from "../axiosClient.js";

export const getTop5CompaniesFollow = () => {
    const url = `admin/dashboard/getTop5CompaniesFollow`;
    return axiosClient.get(url);
};

export const getCardDataStats = () => {
    const url = `admin/dashboard/getDataCard`;
    return axiosClient.get(url);
}

export const getSkillPercent = () => {
    const url = `admin/dashboard/getSkillPercent`;
    return axiosClient.get(url);
}

export const getLevelPercent = () => {
    const url = `admin/dashboard/getLevelPercent`;
    return axiosClient.get(url);
}

export const getUserCountsByRoleAndType = (params) => {
    const url = `admin/dashboard/getUserCountsByRoleAndType`;
    return axiosClient.get(url, {params});
}