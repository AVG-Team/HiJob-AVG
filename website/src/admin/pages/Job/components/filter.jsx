import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {jobPositionsList, provinces} from "../../../../mocks/data.js";
import CustomInput from "../../../../components/Forms/Inputs/customColor.jsx";
import React, {useEffect, useState} from "react";
import {getAllRole} from "../../../../services/apis/admin/users.js";
import companyApi from "../../../../services/apis/companyApi.js"
import {toast} from "react-toastify";

export default function Filter({query, setQuery, handleChange}) {
    const [companies, setCompanies] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use Promise.all to fetch all data in parallel
                const [companyData, roleData] = await Promise.all([
                    companyApi.getCompanies(),
                    getAllRole()
                ]);
                const companyList = companyData.data.content.map(company => ({
                    id: company.id,
                    name: company.name
                }));
                setCompanies(companyList);
                setRoles(roleData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Lỗi khi tải dữ liệu");
            }
        };
        fetchData().then();
    }, []);

    return (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-x-4">
            <div className="mb-3 sm:mb-0">
                <CustomInput
                    fullWidth
                    name="q"
                    label="Tìm kiếm"
                    value={query.q}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3 sm:mb-0">
                <FormControl fullWidth>
                    <InputLabel id="input-company">Công Ty</InputLabel>
                    <Select
                        name="company"
                        labelId="input-company"
                        label="Công Ty"
                        value={query.company}
                        onChange={handleChange}
                        renderValue={(selected) => {
                            if (selected === "" || selected === null || selected === undefined) {
                                return <em style={{opacity: "50%"}}>Chọn Công Ty</em>;
                            }

                            return selected;
                        }}
                    >
                        <MenuItem value="">
                            <em>Chọn Tất Cả</em>
                        </MenuItem>
                        {companies.map((company) => (
                            <MenuItem key={company.id} value={company.name}>
                                {company.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}