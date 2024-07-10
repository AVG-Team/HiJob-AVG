import axiosClient from "./axiosClient";

const skillApi = {
    getAllSkill(params) {
        const url = `/skill`;
        return axiosClient.get(url,{params});
    },
    getSkillById(id) {
        const url = `/skill/getSkillById/${id}`;
        return axiosClient.get(url, { id });
    },
    createSkill(data) {
        console.log(data)
        const url = `/skill/createSkill`;
        return axiosClient.post(url, data);
    },
    updateSkill(id, data) {
        const url = `/skill/updateSkill/${id}`;
        return axiosClient.put(url, data);
    },
    deleteSkill(id) {
        const url = `/skill/deleteSkill/${id}`;
        return axiosClient.put(url, { id });
    },
};

export default skillApi;
