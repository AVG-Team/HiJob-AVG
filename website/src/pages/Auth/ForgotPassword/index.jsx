// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Logo from "~/assets/img/favicon.png";
import CustomInput from "~/components/Forms/Inputs/customColor";
import {useNavigate} from "react-router-dom";
import {CustomLoadingButton} from "../../../components/Forms/Button/customColor.jsx";
import {forgotPassword} from "../../../services/apis/auth.js";
import {toast} from "react-toastify";
import {validateEmail} from "../Validate/validate.js";
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function ForgotPassword(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [errorString, setErrorString] = useState("");
    const [loading, setLoading] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const title = props.title;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const handleVerify = (token) => {
        setRecaptchaToken(token); // Lưu token vào state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        validationErrors.email = validateEmail(email);
        if (validationErrors.email === "") {
            delete validationErrors.email;
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
                const response = await forgotPassword({
                    email: email,
                    recaptchaToken: recaptchaToken
                });

                let message = response.message;

                console.log("response: ", message)
                setLoading(false);

                toast.success(message, {
                    onClose: () => navigate('/notify?type=forgotPassword'),
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
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            If you already remember your account ?{" "}
                            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Login here
                            </a>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <GoogleReCaptchaProvider reCaptchaKey={siteKey} language="vi">
                                <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                                    <GoogleReCaptcha onVerify={handleVerify} />
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
                                    >Reset Password</CustomLoadingButton>
                                </div>
                            </form>
                            </GoogleReCaptchaProvider>
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