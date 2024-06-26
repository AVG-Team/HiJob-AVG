// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Logo from "~/assets/img/favicon.png";
import CustomButton from "~/components/Forms/Button/customColor";
import CustomInput from "~/components/Forms/Inputs/customColor";
import PasswordField from "~/components/Forms/Inputs/customPasswordColor.jsx";
import {register as registerAxios } from "../../../services/apis/auth.js";
import {toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import { CustomLoadingButton } from "../../../components/Forms/Button/customColor.jsx";

export default function Register(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorString, setErrorString] = useState("");
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line react/prop-types
    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (email.trim().length === 0) {
            validationErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = "Email is invalid";
        }

        if (!password.trim()) {
            validationErrors.password = "password is required";
        } else if (password.length < 8) {
            validationErrors.password = "Password must be at least 8 characters long";
        }

        if (password !== rePassword) {
            validationErrors.password = "Password does not match";
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
                const response = await registerAxios({
                    email: email,
                    password: password
                });

                let message = response.message;

                console.log("response: ", message)
                setLoading(false);

                toast.success(message, {
                    onClose: () => navigate('/notify?type=verifyEmail'),
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
                            Sign up to your account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            You have an account?{" "}
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
                                        <CustomInput
                                            error={errors.length !== 0 && errors.email !== "" && errors.email !== undefined}
                                            className="w-full"
                                            label="Email"
                                            type="email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required />
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

                                    <div className="mt-2">
                                        <PasswordField
                                            error={errors.length !== 0 && errors.password !== "" && errors.password !== undefined}
                                            name="re_password"
                                            label="Re-Password"
                                            id="re_password"
                                            autoComplete="re_password"
                                            value={rePassword}
                                            onChange={(e) => setRePassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div className={`bg-red-100 text-red-500 p-4 ${errorString.length !== 0 ? "" : "hidden"}`}
                                         role="alert">
                                        {errorString}
                                    </div>
                                </div>

                                <div>
                                    <CustomLoadingButton variant="contained" type="submit" className="w-full" loading={loading}
                                    >Sign Up</CustomLoadingButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <DotLottieReact src="https://lottie.host/9b81d0b3-d8fc-4e1e-a646-722edc9a6f32/fX94e8juVb.json"
                                loop autoplay direction="1" />
            </div>
        </div>
    </>;
}