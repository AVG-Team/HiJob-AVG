import axiosClient from "./axiosClient";

const jobSkillApi = {
    getAllSkillsByJobId(jobId) {
        const url = `/jobSkill/${jobId}`;
        return axiosClient.get(url, { jobId });
    },
};

export default jobSkillApi;
