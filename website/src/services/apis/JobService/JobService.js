import axios from "axios";
import axiosClient from "../axiosClient";

const jobService = {
    getAllByPage(params){
        const url = "/api/jobs/all";
        return axiosClient.get(url, {params})
    },
};

export default jobService