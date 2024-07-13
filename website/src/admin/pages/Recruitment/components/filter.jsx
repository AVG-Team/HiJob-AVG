import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {jobPositionsList, provinces} from "../../../../mocks/data.js";
import CustomInput from "../../../../components/Forms/Inputs/customColor.jsx";
import React from "react";

export default function Filter({query, setQuery, handleChange}) {
    return (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
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
                    <InputLabel id="input-status">Trạng thái</InputLabel>
                    <Select
                        name="status"
                        labelId="input-status"
                        label="Trạng thái"
                        value={query.status}
                        onChange={handleChange}
                        renderValue={(selected) => {
                            switch (selected) {
                                case "-1":
                                    return "Từ chối";
                                case "0":
                                    return "Đang chờ";
                                case "1":
                                    return "Đã được duyệt";
                                default:
                                    return <em style={{ opacity: "50%" }}>Chọn Trạng Thái</em>;
                            }
                        }}
                    >
                        <MenuItem value="">
                            <em>Chọn Trạng Thái</em>
                        </MenuItem>
                        <MenuItem value="-1">
                            <em>Từ chối</em>
                        </MenuItem>
                        <MenuItem value="0">
                            <em>Đang chờ</em>
                        </MenuItem>
                        <MenuItem value="1">
                            <em>Đã được duyệt</em>
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}