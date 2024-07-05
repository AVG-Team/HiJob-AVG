import axiosClient from "./axiosClient";

const skillApi = {
    getAllSkills() {
        const url = `/skill`;
        return axiosClient.get(url);
    },
};

export default skillApi;
