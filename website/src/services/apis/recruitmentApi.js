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
    getRecruitmentQuery(params) {
        const url = `/recruitment`;
        return axiosClient.get(url, {params});
    },
    getRecruitmentById(id) {
        const url = `/recruitment/getRecruitmentById/${id}`;
        return axiosClient.get(url, { id });
    },
    updateRecruitment(id, data) {
        const url = `/recruitment/updateRecruitment/${id}`;
        return axiosClient.put(url, data);
    },
    deleteRecruitment(id) {
        const url = `/recruitment/deleteRecruitment/${id}`;
        return axiosClient.put(url, { id });
    },
};

export default recruitmentApi;
