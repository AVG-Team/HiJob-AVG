import axiosClient from "./axiosClient";

const levelApi = {
    getAllLevel() {
        const url = `/level`;
        return axiosClient.get(url);
    },
};

export default levelApi;
