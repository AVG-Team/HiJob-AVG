import axiosClient from "./axiosClient";

const jobTypeApi = {
    getAllTypeByJobId(jobId) {
        const url = `/jobTypeDetail/${jobId}`;
        return axiosClient.get(url, { jobId });
    },
    create(data) {
        const url = "/jobTypeDetail/create";
        return axiosClient.post(url, data);
    },
};

export default jobTypeApi;
