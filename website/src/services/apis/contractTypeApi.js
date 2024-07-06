import axiosClient from "./axiosClient";

const contractTypeApi = {
    getAllContractTypeByContractId(contractId) {
        const url = `/contract-type-detail/${contractId}`;
        return axiosClient.get(url, { contractId });
    },
};

export default contractTypeApi;
