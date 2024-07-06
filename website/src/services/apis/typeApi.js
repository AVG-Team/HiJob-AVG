import axiosClient from "./axiosClient";

const typeApi = {
    getAllType() {
        const url = `/type`;
        return axiosClient.get(url);
    },
};

export default typeApi;
