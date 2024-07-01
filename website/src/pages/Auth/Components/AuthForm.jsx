import React, {useState} from "react";
import FormInput from "./FormInput";
import { CustomLoadingButton } from "../../../components/Forms/Button/customColor.jsx";
import ShowError from "../Components/ShowError.jsx";
import Oauth2 from "../Components/Oauth2.jsx";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import {Checkbox, FormControlLabel} from "@mui/material";

const AuthForm = ({ handleSubmit, email, setEmail, password, setPassword, rePassword, setRePassword, errors, errorString, loading, remember, setRemember, showRePassword, type, recaptchaToken=undefined, setRecaptchaToken=undefined }) => {
    const handleVerify = (token) => {
        setRecaptchaToken(token);
    };

    let btnText = "";

    if (type === "login") {
        btnText = "Sign In";
    } else if (type === "register") {
        btnText = "Sign Up";
    } else if (type === "forgotPassword") {
        btnText = "Forgot Password";
    } else if (type === "changePassword") {
        btnText = "Change Password";
    } else {
        btnText = "Submit";
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {recaptchaToken !== undefined && (
                <GoogleReCaptcha onVerify={handleVerify} />
            )}

            {email !== undefined && (
                <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                />
            )}
            {password !== undefined && (
                <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                />
            )}
            {showRePassword && rePassword !== undefined && password !== undefined &&(
                <FormInput
                    label="Re-Password"
                    type="password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    error={!!errors.password}
                />
            )}
            {remember !== undefined && (
                <div className="flex items-center justify-between">
                    <FormControlLabel
                        control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
                        label="Remember me"
                    />
                    <a href="/forgot-password" className="font-semibold hover:text-primary">
                        Forgot password?
                    </a>
                </div>
            )}
            <ShowError errorString={errorString} />
            <CustomLoadingButton variant="contained" type="submit" className="w-full" loading={loading}>
                {btnText}
            </CustomLoadingButton>
        </form>
    );
};

export default AuthForm;
