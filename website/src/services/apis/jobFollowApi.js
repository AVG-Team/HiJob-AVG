import axiosClient from "./axiosClient";

const jobFollowApi = {
    getAllJobFollows() {
        const url = "/job-follows";
        return axiosClient.get(url);
    },
    getAllFollowsByUserId(userId) {
        const url = `/job-follows/user/${userId}`;
        return axiosClient.get(url, { userId });
    },
    getAllFollowsByJobId(jobId) {
        const url = `/job-follows/job/${jobId}`;
        return axiosClient.get(url, { jobId });
    },
    getJobFollowById(id) {
        const url = `/job-follows/${id}`;
        return axiosClient.get(url);
    },
    getJobFollowByUserIdAndJobId(userId, jobId) {
        const url = `/job-follows/${userId}/${jobId}`;
        return axiosClient.get(url, { userId, jobId });
    },
    createJobFollow(userId, jobId) {
        const url = `/job-follows/create/${userId}/${jobId}`;
        return axiosClient.post(url, { userId, jobId });
    },
    deleteJobFollow(userId, jobId) {
        const url = `/job-follows/delete/${userId}/${jobId}`;
        return axiosClient.delete(url, { userId, jobId });
    },
};

export default jobFollowApi;
