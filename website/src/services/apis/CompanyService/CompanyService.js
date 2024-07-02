import axios from "axios";
import axiosClient from "../axiosClient";

const CompanyService = {
    getAllByPage(params){
        const url = "/api/companies/all";
        return axiosClient.get(url, {params})
    },
};

export default CompanyService