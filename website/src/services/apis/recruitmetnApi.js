import axiosClient from "./axiosClient";

const recruitmentApi = {
    applyJob: (data) => {
        const url = "/recruitment/createRecruitment";
        return axiosClient.post(url, data);
    },
};

export default recruitmentApi;
