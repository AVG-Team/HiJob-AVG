import axiosClient from "./axiosClient";

const jobTypeApi = {
    getAllTypeByJobId(jobId) {
        const url = `/type/${jobId}`;
        return axiosClient.get(url, { jobId });
    },
};

export default jobTypeApi;
