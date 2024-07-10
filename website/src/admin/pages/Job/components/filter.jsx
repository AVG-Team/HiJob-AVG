import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import CustomInput from "../../../../components/Forms/Inputs/customColor.jsx";
import React, {useEffect, useState} from "react";
import companyApi from "../../../../services/apis/companyApi.js"
import {toast} from "react-toastify";

export default function Filter({query, setQuery, handleChange}) {
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
                    <InputLabel id="input-salary">Lương</InputLabel>
                    <Select
                        name="salary"
                        labelId="input-salary"
                        label="Lương"
                        value={query.salary}
                        onChange={handleChange}
                        renderValue={(selected) => {
                            if (selected === "" || selected === -1 || selected === "-1" || selected === null || selected === undefined) {
                                return <em style={{opacity: "50%"}}>Chọn Mức Lương</em>;
                            } else if (selected === 0) {
                                return "Không Lương";
                            }

                            return selected + " Triệu";
                        }}
                    >
                        <MenuItem value="-1">
                            <em>Tất Cả</em>
                        </MenuItem>
                        <MenuItem value="0">
                            <em>Không Lương</em>
                        </MenuItem>
                        <MenuItem value="1">
                            1 Triệu
                        </MenuItem>
                        <MenuItem value="5">
                            5 Triệu
                        </MenuItem>
                        <MenuItem value="10">
                            10 Triệu
                        </MenuItem>
                        <MenuItem value="15">
                            15 Triệu
                        </MenuItem>
                        <MenuItem value="20">
                            20 Triệu
                        </MenuItem>
                        <MenuItem value="25">
                            25 Triệu
                        </MenuItem>
                        <MenuItem value="30">
                            Trên 30 Triệu
                        </MenuItem>
                        <MenuItem value="62">
                            62k
                        </MenuItem>
                        <MenuItem value="100">
                            100k
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="mb-3 sm:mb-0">
                <FormControl fullWidth>
                    <InputLabel id="input-yearExp">Kinh Nghiệm</InputLabel>
                    <Select
                        name="yearExp"
                        labelId="input-yearExp"
                        label="Kinh Nghiệm"
                        value={query.yearExp}
                        onChange={handleChange}
                        renderValue={(selected) => {
                            if (selected === -1 || selected === "-1" || selected === "" || selected === null || selected === undefined) {
                                return <em style={{opacity: "50%"}}>Chọn Kinh Nghiệm</em>;
                            } else if (selected === 0) {
                                return "0 cần kinh nghiệm";
                            } else if (selected === 11) {
                                return "Trên 10 năm";
                            }

                            return selected + " Năm";
                        }}
                    >
                        <MenuItem value="-1">
                            <em>Tất Cả</em>
                        </MenuItem>
                        <MenuItem value="0">
                            Không cần kinh nghiệm
                        </MenuItem>
                        {Array.from({ length: 10 }, (_, i) => (
                            <MenuItem key={i+1} value={i+1}>
                                {`Dưới ${i+1} năm`}
                            </MenuItem>
                        ))}
                        <MenuItem value="11">
                            Trên 10 năm
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}