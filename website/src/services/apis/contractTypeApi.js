import axiosClient from "./axiosClient";

const contractTypeApi = {
    getAllContractTypeByContractId(contractId) {
        const url = `/contract-type-detail/${contractId}`;
        return axiosClient.get(url, { contractId });
    },
    create(data) {
        const url = "/contract-type-detail/create";
        return axiosClient.post(url, data);
    },
};

export default contractTypeApi;
