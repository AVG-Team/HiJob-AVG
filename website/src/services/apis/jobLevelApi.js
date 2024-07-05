import axiosClient from "./axiosClient";

const jobLevelApi = {
    getAllLevelByJobId(jobId) {
        const url = `/level/${jobId}`;
        return axiosClient.get(url, { jobId });
    },
};

export default jobLevelApi;
