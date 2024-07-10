import axiosClient from "./axiosClient";

const jobLevelApi = {
    getAllLevelByJobId(jobId) {
        const url = `/jobLevel/${jobId}`;
        return axiosClient.get(url, { jobId });
    },
    create(data) {
        const url = "/jobLevel/create";
        return axiosClient.post(url, data);
    },
};

export default jobLevelApi;
