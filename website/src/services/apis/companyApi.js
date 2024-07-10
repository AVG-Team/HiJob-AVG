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
        const url = `/companies/getCompanyByUser/${userId}`;
        return axiosClient.get(url, { userId });
    },
    getCompanies(params) {
        const url = `/companies`;
        return axiosClient.get(url, { params });
    },
    createCompany(data) {
        const url = `/companies/createCompany`;
        return axiosClient.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    updateCompany(id, data) {
        const url = `/companies/updateCompany/${id}`;
        return axiosClient.put(url, { id, data });
    },
    deleteCompany(id) {
        const url = `/companies/deleteCompany/${id}`;
        return axiosClient.put(url, { id });
    },
};

export default companyApi;
