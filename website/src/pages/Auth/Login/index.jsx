// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
    Checkbox,
    FormControlLabel,

} from "@mui/material";
import Logo from "~/assets/img/favicon.png";
import CustomInput from "~/components/Forms/Inputs/customColor";
import PasswordField from "~/components/Forms/Inputs/customPasswordColor.jsx";
import {CustomLoadingButton} from "../../../components/Forms/Button/customColor.jsx";
import {authenticate} from "../../../services/apis/auth.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import {GOOGLE_AUTH_URL} from "../../../services/key/url.js";
import {validateEmail, validatePassword} from "../Validate/validate.js";

export default function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorString, setErrorString] = useState("");

    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);

    const clientId = 'YOUR_GOOGLE_CLIENT_ID';

    async function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = {};
        validationErrors.email = validateEmail(email);
        if (validationErrors.email === "") {
            delete validationErrors.email;
        }
        validationErrors.password = validatePassword(password);
        if (validationErrors.password === "") {
            delete validationErrors.password;
        }
        setErrors(validationErrors);

        console.log(validationErrors)
        if (Object.keys(validationErrors).length !== 0) {
            const errorTmp = Object.entries(validationErrors)
                .map(([key, value]) => `${key} : ${value}`)
                .join('\n');

            setErrorString(errorTmp);
        } else {
            try {
                setLoading(true);
                const response = await authenticate({
                    email: email,
                    password: password,
                    rememberMe : remember
                });

                console.log(response)

                let message = response.message;

                console.log("response: ", message)
                setLoading(false);

                toast.success(message, {
                    onClose: () => navigate('/'),
                    autoClose: 2000,
                    buttonClose: false
                });

            } catch (err) {
                toast.error(err.message);
                setErrorString(err.message)
                console.error("Error fetching server: ", err);

                setLoading(false);
            }
        }
    }

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
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            You don't have an account?{" "}
                            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Register here
                            </a>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <div className="mt-2">
                                        <CustomInput
                                            error={errors.length !== 0 && errors.email !== "" && errors.email !== undefined}
                                            className="w-full"
                                            label="Email"
                                            type="email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required/>
                                    </div>
                                </div>

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
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <FormControlLabel
                                            control={<Checkbox/>}
                                            label="Remember me"
                                            checked={remember}
                                            onChange={(e) => setRemember(e.target.checked)}
                                        />
                                    </div>

                                    <div className="text-sm leading-6">
                                        <a href="/forgot-password" className="font-semibold hover:text-primary">
                                            Forgot password?
                                        </a>
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
                                    >Sign In</CustomLoadingButton>
                                </div>
                            </form>
                        </div>

                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"/>
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4">
                                <a
                                    href={GOOGLE_AUTH_URL}
                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                >
                                    <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                        <path
                                            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                            fill="#EA4335"
                                        />
                                        <path
                                            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                            fill="#34A853"
                                        />
                                    </svg>

                                    <span className="text-sm font-semibold leading-6">Google</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <DotLottieReact
                                style={{ width: "100%", height: "100%" }}
                                src="https://lottie.host/7af0aab9-f06a-4a96-9607-7ebe4486339b/0fYYVaUlOI.json" loop
                                autoplay direction="1" />
            </div>
        </div>
    </>;
}