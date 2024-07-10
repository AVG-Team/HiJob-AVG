import axiosClient from "./axiosClient";

const roleApi = {
    getAllRole(params) {
        const url = `/admin/roles/getRoles`;
        return axiosClient.get(url,{params});
    }
};

export default roleApi;
