import axiosClient from "./axiosClient";

const jobTypeApi = {
    getAllTypeByJobId(jobId) {
        const url = `/jobTypeDetail/${jobId}`;
        return axiosClient.get(url, { jobId });
    },
};

export default jobTypeApi;
