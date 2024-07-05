import React, { useState, useMemo, useCallback, useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const TextFieldColor = styled(TextField)({
    "& label.Mui-focused": {
        color: "#00a9ff",
    },
    "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
            borderColor: "#00a9ff",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#00a9ff",
        },
    },
});

// eslint-disable-next-line react/prop-types
const PasswordVisibilityToggle = ({ showPassword, onClick }) => (
    <InputAdornment position="end">
        <IconButton aria-label="toggle password visibility" onClick={onClick} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
    </InputAdornment>
);

function PasswordField({
                           // eslint-disable-next-line react/prop-types
                           label,
                           name = "password",
                           id = "password",
                           autoComplete = "current-password",
                           value,
                           onChange, // Thêm props onChange
                           ...props
                       }) {
    const [showPassword, setShowPassword] = useState(false);
    const [hasValuePassword, setHasValuePassword] = useState(false);
    const passwordRef = useRef(null);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = useCallback((e) => {
        setHasValuePassword(passwordRef.current.value.length > 0);
        if (onChange) {
            onChange(e);
        }
    }, [onChange]);

    const endAdornment = useMemo(() => {
        if (!hasValuePassword) return null;
        return <PasswordVisibilityToggle showPassword={showPassword} onClick={handleClickShowPassword} />;
    }, [hasValuePassword, showPassword]);

    return (
        <div className="mt-2">
            <TextFieldColor
                {...props}
                margin="normal"
                fullWidth
                name={name}
                label={label}
                type={showPassword ? "text" : "password"}
                id={id}
                onChange={handleChange}
                autoComplete={autoComplete}
                value={value}
                InputProps={{
                    endAdornment: endAdornment,
                }}
                inputRef={passwordRef}
            />
        </div>
    );
}

export default PasswordField;