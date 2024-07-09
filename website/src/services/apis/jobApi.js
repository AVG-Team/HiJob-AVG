import axiosClient from "./axiosClient";

const jobApi = {
    getAllJobs(params) {
        const url = `/jobs`;
        return axiosClient.get(url, { params });
    },
    getJobById(id) {
        const url = `/jobs/getJobById/${id}`;
        return axiosClient.get(url, { id });
    },
    getJobCreateToday(params) {
        const url = `/jobs/getJobCreateToday`;
        return axiosClient.get(url, { params });
    },
    getJobByCompany(companyId) {
        const url = `/jobs/getJobByCompany/${companyId}`;
        return axiosClient.get(url, { companyId });
    },
    createJob(data) {
        const url = `/jobs/createJob`;
        return axiosClient.post(url, { data });
    },
    updateJob(id, data) {
        const url = `/jobs/updateJob/${id}`;
        return axiosClient.put(url, data);
    },
    deleteJob(id) {
        const url = `/jobs/deleteJob/${id}`;
        return axiosClient.put(url, { id });
    },
};

export default jobApi;
