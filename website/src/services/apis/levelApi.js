import axiosClient from "./axiosClient";

const levelApi = {
    getAllLevel(params) {
        const url = `/level`;
        return axiosClient.get(url, {params});
    },
    getLevelById(id) {
        const url = `/level/getLevelById/${id}`;
        return axiosClient.get(url, { id });
    },
    createLevel(data) {
        const url = `/level/createLevel`;
        return axiosClient.post(url, data);
    },
    updateLevel(id, data) {
        const url = `/level/updateLevel/${id}`;
        return axiosClient.put(url, data);
    },
    deleteLevel(id) {
        const url = `/level/deleteLevel/${id}`;
        return axiosClient.put(url, { id });
    },
};

export default levelApi;
