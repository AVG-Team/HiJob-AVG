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
                <FormControl fullWidth>
                    <InputLabel id="input-province">Tỉnh thành</InputLabel>
                    <Select
                        name="province"
                        labelId="input-province"
                        label="Province"
                        value={query.province}
                        onChange={handleChange}
                        renderValue={(selected) => {
                            if (selected === "" || selected === null || selected === undefined) {
                                return <em style={{opacity: "50%"}}>Chọn tỉnh thành</em>;
                            }

                            return selected;
                        }}
                    >
                        <MenuItem value="">
                            <em>Chọn Tất Cả</em>
                        </MenuItem>
                        {provinces.map((province) => (
                            <MenuItem key={province.idProvince} value={province.name}>
                                {province.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className="mb-3 sm:mb-0">
                <FormControl fullWidth>
                    <InputLabel id="input-job-position">Vị Trí Công Việc</InputLabel>
                    <Select
                        name="jobPosition"
                        labelId="input-job-position"
                        label="Vị Trí Công Việc"
                        value={query.jobPosition}
                        onChange={handleChange}
                        renderValue={(selected) => {
                            if (selected === "" || selected === null || selected === undefined) {
                                return <em style={{opacity: "50%"}}>Chọn Vị Trí Công Việc</em>;
                            }

                            return selected;
                        }}
                    >
                        <MenuItem value="">
                            <em>Chọn Tất Cả</em>
                        </MenuItem>
                        {jobPositionsList.map((jobPosition, index) => (
                            <MenuItem key={index} value={jobPosition}>
                                {jobPosition}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
            <div className="mb-3 mt-3 lg:mt-3 sm:mb-0 sm:col-span-3 grid sm:grid-cols-3 gap-x-4">
                <div className="mb-3 sm:mb-0">
                    <CustomInput
                        id="input-age"
                        type="number"
                        placeholder="18"
                        className="!w-full"
                        label="Tuổi"
                        name="age"
                        value={query.age}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 sm:mb-0">
                    <FormControl fullWidth>
                        <InputLabel id="input-role">Chức Vụ</InputLabel>
                        <Select
                            name="role"
                            labelId="input-role"
                            label="Chọn chức vụ"
                            value={query.role}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Chọn Tất Cả</em>
                            </MenuItem>
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="mb-3 sm:mb-0">
                    <FormControl fullWidth>
                        <InputLabel id="input-active">Tình Trạng</InputLabel>
                        <Select
                            name="active"
                            labelId="input-active"
                            label="Chọn chức vụ"
                            value={query.active}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>Chọn Tất Cả</em>
                            </MenuItem>
                            <MenuItem value="1">
                                <em>Đã Kích Hoạt</em>
                            </MenuItem>
                            <MenuItem value="0">
                                <em>Chưa Kích Hoạt</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}