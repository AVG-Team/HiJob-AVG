import axiosClient from "./axiosClient";

const recruitmentApi = {
    applyJob: (data) => {
        const url = "/recruitment/createRecruitment";
        return axiosClient.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    getRecruitmentByUserIdAndJobId: (jobId, userId) => {
        const url = `/recruitment/getRecruitmentByJobIdAndUserId/${jobId}/${userId}`;
        return axiosClient.get(url, { jobId, userId });
    },
    getRecruitmentByUserId: (userId) => {
        const url = `/recruitment/getRecruitmentByUserId/${userId}`;
        return axiosClient.get(url, { userId });
    },
};

export default recruitmentApi;
