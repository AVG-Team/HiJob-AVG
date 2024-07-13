import axiosClient from "../axiosClient.js";

export const getAll = (params) => {
    const url = "/admin/users";
    return axiosClient.get(url, {params});
};

export const getAllRole = () => {
    const url = "/admin/roles";
    return axiosClient.get(url);
};

export const createUser = (userInfo) => {
    const url = "admin/users/create";
    return axiosClient.post(url, userInfo, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getUserInfo = (id) => {
    const url = `/admin/users/${id}`;
    return axiosClient.get(url);
}

export const editUser = (userInfo, id) => {
    const url = "admin/users/edit/" + id;
    return axiosClient.put(url, userInfo, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteUser = (id) => {
    const url = `/admin/users/delete/${id}`;
    return axiosClient.delete(url);
};