import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {jobPositionsList, provinces} from "../../../../mocks/data.js";
import CustomInput from "../../../../components/Forms/Inputs/customColor.jsx";

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
        </div>
    )
}