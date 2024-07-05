import React, {useState} from "react";
import PasswordField from "../../../components/Forms/Inputs/customPasswordColor.jsx";
import {CustomLoadingButton} from "../../../components/Forms/Button/customColor.jsx";
import {validateEmail, validatePassword} from "../../../services/validate/validate.js";
import {toast} from "react-toastify";
import {authenticate} from "../../../services/apis/auth.js";
import {changePassword} from "../../../services/apis/profile.js";

export default function ChangePassword() {
    const [errors, setErrors] = useState({});
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorString, setErrorString] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        validationErrors.oldPassword = validatePassword(oldPassword);
        if (validationErrors.oldPassword === "") delete validationErrors.oldPassword;
        validationErrors.newPassword = validatePassword(newPassword);
        if (validationErrors.newPassword === "") delete validationErrors.newPassword;
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) {
            setErrorString(Object.entries(validationErrors)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n'));
        } else {
            try {
                setLoading(true);
                const response = await changePassword({ oldPassword, newPassword });
                toast.success(response.message, {
                    autoClose: 2000
                });
            } catch (err) {
                toast.error(err.message);
                setErrorString(err.message)
                console.error("Error fetching server: ", err);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Old Password</label>
                <PasswordField
                    error={!!errors.oldPassword}
                    name="oldPassword"
                    id="oldPassword"
                    autoComplete="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <PasswordField
                    error={!!errors.newPassword}
                    name="newPassword"
                    id="newPassword"
                    autoComplete="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>
            <CustomLoadingButton variant="contained" type="submit" className="w-full" loading={loading}>
                Save
            </CustomLoadingButton>
            <div className="mt-2">
                <div
                    className={`bg-red-100 text-red-500 p-4 ${errorString.length !== 0 ? "" : "hidden"}`}
                    role="alert">
                    {errorString}
                </div>
            </div>
        </form>
    )
}