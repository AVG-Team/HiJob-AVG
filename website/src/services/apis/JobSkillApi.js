import axiosClient from "./axiosClient";

const jobSkillApi = {
    getAllSkillsByJobId(jobId) {
        const url = `/jobSkill/${jobId}`;
        return axiosClient.get(url, { jobId });
    },
    create(data) {
        const url = "/jobSkill/create";
        return axiosClient.post(url, data);
    },
};

export default jobSkillApi;
