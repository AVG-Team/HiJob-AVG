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
        </div>
    )
}