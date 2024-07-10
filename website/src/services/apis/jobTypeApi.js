import axiosClient from "./axiosClient";

const jobTypeApi = {
    getAllTypeByJobId(jobId) {
        const url = `/jobTypeDetail/${jobId}`;
        return axiosClient.get(url, { jobId });
    },
    getAllJobType(params) {
        const url = `/jobTypeDetail`;
        return axiosClient.get(url,{params});
    },
    getJobTypeById(id) {
        const url = `/jobTypeDetail/getJobTypeById/${id}`;
        return axiosClient.get(url, { id });
    },
    createJobType(data) {
        const url = `/jobTypeDetail/createJobType`;
        return axiosClient.post(url, data);
    },
    updateJobType(id, data) {
        const url = `/jobTypeDetail/updateJobType/${id}`;
        return axiosClient.put(url, data);
    },
    deleteJobType(id) {
        const url = `/jobTypeDetail/deleteJobType/${id}`;
        return axiosClient.put(url, { id });
    },
};

export default jobTypeApi;
