import axiosClient from "./axiosClient";

const companyApi = {
    getCompanyById(id) {
        const url = `/companies/getCompanyById/${id}`;
        return axiosClient.get(url, { id });
    },
    getTop5Companies() {
        const url = `/companies/getTop5Companies`;
        return axiosClient.get(url);
    },
    getCompanyByUserId(userId) {
        const url = `/companies/getCompanyByUserId/${userId}`;
        return axiosClient.get(url, { userId });
    },
    getCompanies() {
        const url = `/companies`;
        return axiosClient.get(url);
    },
    createCompany(data) {
        console.log(data)
        const url = `/companies/createCompany`;
        return axiosClient.post(url, data);
    },
    updateCompany(id, data) {
        const url = `/companies/updateCompany/${id}`;
        return axiosClient.put(url, data);
    },
    deleteCompany(id) {
        const url = `/companies/deleteCompany/${id}`;
        return axiosClient.put(url, { id });
    },
};

export default companyApi;
