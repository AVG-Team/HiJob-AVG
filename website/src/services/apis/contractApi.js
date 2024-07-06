import axiosClient from "./axiosClient";

const contractApi = {
    getAllContract() {
        const url = `/contract-type`;
        return axiosClient.get(url);
    },
};

export default contractApi;
