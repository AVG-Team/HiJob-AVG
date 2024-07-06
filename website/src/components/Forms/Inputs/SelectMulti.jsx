import {MenuItem, OutlinedInput, Select} from "@mui/material";
import {skills as skillData} from "../../../mocks/data.js";
import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";

const SelectMulti = ({listData, data, textPlaceholder, formData, setFormData , disabled = false}) => {
    const [valueArr, setValueArr] = useState([])

    useEffect(() => {
        setValueArr(data ? data.split(', ') : []);
    }, []);


    // multi select
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    function getStyles(name, valueArr, theme) {
        return {
            fontWeight:
                valueArr?.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleChangeSkills = (event) => {
        const {
            target: { value },
        } = event;
        setValueArr(
            typeof value === 'string' ? value.split(',') : value
        )
        if (typeof value === 'string') {
            setFormData({ ...formData, skills: value });
        } else {
            setFormData({ ...formData, skills: value.join(', ') });
        }
    };

    const theme = useTheme();
    return (
        <Select
            disabled={disabled}
            name="skills"
            multiple
            displayEmpty
            value={valueArr}
            onChange={handleChangeSkills}
            input={<OutlinedInput />}
            renderValue={(selected) => {
                if (!Array.isArray(selected) || selected.length === 0) {
                    return <em style={{ opacity: "50%"}}>{textPlaceholder}</em>;
                }

                return selected.join(', ');
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
            fullWidth
        >
            <MenuItem disabled value="">
                <em>{textPlaceholder}</em>
            </MenuItem>
            {listData.map((tmp) => (
                <MenuItem
                    key={tmp}
                    value={tmp}
                    style={getStyles(tmp, valueArr, theme)}
                >
                    {tmp}
                </MenuItem>
            ))}
        </Select>
    )
}

export default SelectMulti;