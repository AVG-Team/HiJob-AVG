import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Logo from "~/assets/img/favicon.png";
import {useNavigate} from "react-router-dom";
import {CustomLoadingButton} from "../../../components/Forms/Button/customColor.jsx";
import {changePassword, forgotPassword} from "../../../services/apis/auth.js";
import {toast} from "react-toastify";
import {validatePassword} from "../Validate/validate.js";
import PasswordField from "../../../components/Forms/Inputs/customPasswordColor.jsx";

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
        document.title = title ? `${title}` : "Page Does Not Exist";
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
        if (validationErrors.password === "") {
            delete validationErrors.password;
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) {
            const errorTmp = Object.entries(validationErrors)
                .map(([key, value]) => `${key} : ${value}`)
                .join('\n');

            setErrorString(errorTmp);
        } else {
            try {
                setLoading(true);
                const response = await changePassword({
                    token: token,
                    newPassword: password,
                });

                let message = response.message;

                console.log("response: ", message)
                setLoading(false);

                toast.success(message, {
                    onClose: () => navigate('/'),
                    autoClose: 1000,
                    buttonClose: false
                });

            } catch (err) {
                toast.error(err.message);
                setErrorString(err.message)
                console.error("Error fetching server: ", err);

                setLoading(false);
            }
        }
    };

    return <>
        <div className="min-h-full grid lg:grid-cols-2 lg:gap-4">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="flex items-center flex-col">
                        <img
                            className="h-10 w-auto"
                            src={Logo}
                            alt="HI JOB"
                        />
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Forgot Password
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            If you already remember your account ?{" "}
                            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Login here
                            </a>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <div className="mt-2">
                                        <PasswordField
                                            error={errors.length !== 0 && errors.password !== "" && errors.password !== undefined}
                                            name="password"
                                            label="Password"
                                            id="password"
                                            autoComplete="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <PasswordField
                                            error={errors.length !== 0 && errors.password !== "" && errors.password !== undefined}
                                            name="rePassword"
                                            label="Re Password"
                                            id="rePassword"
                                            autoComplete="rePassword"
                                            value={rePassword}
                                            onChange={(e) => setRePassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div
                                        className={`bg-red-100 text-red-500 p-4 ${errorString.length !== 0 ? "" : "hidden"}`}
                                        role="alert">
                                        {errorString}
                                    </div>
                                </div>
                                <div>
                                    <CustomLoadingButton variant="contained" type="submit" className="w-full"
                                                         loading={loading}
                                    >Change Password</CustomLoadingButton>
                                </div>
                            </form>
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