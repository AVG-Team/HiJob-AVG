import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Logo from "~/assets/img/favicon.png";
import {useNavigate} from "react-router-dom";
import {CustomLoadingButton} from "../../../components/Forms/Button/customColor.jsx";
import {changePassword, forgotPassword} from "../../../services/apis/auth.js";
import {toast} from "react-toastify";
import {validatePassword} from "../../../services/validate/validate.js";
import PasswordField from "../../../components/Forms/Inputs/customPasswordColor.jsx";
import TitleForm from "../Components/TitleForm.jsx";
import AuthForm from "../Components/AuthForm.jsx";

export default function ChangePassword(props) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorString, setErrorString] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");

    const title = props.title;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";
        const urlParams = new URLSearchParams(window.location.search);
        setToken(urlParams.get('token'));
    }, [title]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (token === null) {
            toast.error("Token is required");
            navigate('/notify?type=forgotPassword')
            return;
        }

        const validationErrors = {};
        validationErrors.password = validatePassword(password);
        validationErrors.password = validatePassword(rePassword);
        if (validationErrors.password === "") delete validationErrors.password;
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) {
            setErrorString(Object.entries(validationErrors)
                .map(([key, value]) => `${key} : ${value}`)
                .join('\n'));
        } else {
            try {
                setLoading(true);
                const response = await changePassword({token,newPassword: password});
                toast.success(response.message, {
                    onClose: () => navigate('/'),
                    autoClose: 1000,
                    buttonClose: false
                });
            } catch (err) {
                toast.error(err.message);
                setErrorString(err.message)
                console.error("Error fetching server: ", err);
            } finally {
                setLoading(false);
            }
        }
    };

    return <>
        <div className="min-h-full grid lg:grid-cols-2 lg:gap-4">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <TitleForm type="changePassword"/>
                    <div className="mt-10">
                        <div>
                            <AuthForm
                                handleSubmit={handleSubmit}
                                password={password}
                                setPassword={setPassword}
                                rePassword={rePassword}
                                setRePassword={setRePassword}
                                errors={errors}
                                errorString={errorString}
                                loading={loading}
                                showRePassword={true}
                                type={"changePassword"}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <DotLottieReact src="https://lottie.host/f0774770-0c02-40fb-8946-cd6f3ba17988/rR9TyEBHNN.json"
                                loop autoplay direction="1"/>
            </div>
        </div>
    </>;
}