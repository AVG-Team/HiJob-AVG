import React from "react";
import CustomInput from "~/components/Forms/Inputs/customColor";
import PasswordField from "~/components/Forms/Inputs/customPasswordColor.jsx";

const FormInput = ({ label, type, value, onChange, error }) => {
    return (
        <div className="mt-2">
            {type === "password" ? (
                <PasswordField
                    error={error}
                    name={label.toLowerCase()}
                    label={label}
                    id={label.toLowerCase()}
                    autoComplete={label.toLowerCase()}
                    value={value}
                    onChange={onChange}
                    required
                />
            ) : (
                <CustomInput
                    error={error}
                    className="w-full"
                    label={label}
                    type={type}
                    autoComplete={label.toLowerCase()}
                    value={value}
                    onChange={onChange}
                    required
                />
            )}
        </div>
    );
};

export default FormInput;
