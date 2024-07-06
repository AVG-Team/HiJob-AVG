import axiosClient from "./axiosClient";

const jobLevelApi = {
    getAllLevelByJobId(jobId) {
        const url = `/jobLevel/${jobId}`;
        return axiosClient.get(url, { jobId });
    },
};

export default jobLevelApi;
