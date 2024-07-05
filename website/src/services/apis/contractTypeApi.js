import axiosClient from "./axiosClient";

const contractTypeApi = {
    getAllContractTypeByContractId(contractId) {
        const url = `/contract-type/${contractId}`;
        return axiosClient.get(url, { contractId });
    },
};

export default contractTypeApi;
