// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Logo from "../../assets/img/favicon.png";
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    styled,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomButton from "../../components/Forms/Button/customColor";
import CustomInput from "../../components/Forms/Inputs/customColor";
import PasswordField from "../../components/Forms/Inputs/customPasswordColor.jsx";

export default function Login(props) {
    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);

    return <>
        <div className="min-h-full grid grid-cols-2 gap-4">
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
                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Register here
                            </a>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form action="#" method="POST" className="space-y-6">
                                <div>
                                    <div className="mt-2">
                                        <CustomInput className="w-full" label="Email" type="email" autoComplete="email" required />
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-2">
                                        <PasswordField
                                            name="password"
                                            label="Password"
                                            id="password"
                                            autoComplete="password"
                                            required
                                        />

                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <FormControlLabel control={<Checkbox />} label="Remember me" />
                                    </div>

                                    <div className="text-sm leading-6">
                                        <a href="#" className="font-semibold hover:text-primary">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <CustomButton variant="contained" type="submit" className="w-full"
                                    >Sign In</CustomButton>
                                </div>
                            </form>
                        </div>

                        <div className="mt-10">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm font-medium leading-6">
                                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <a
                                    href="#"
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

                                <a
                                    href="#"
                                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                                >
                                    <svg className="h-5 w-5 fill-[#24292F]" aria-hidden="true" fill="currentColor"
                                         viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm font-semibold leading-6">GitHub</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <DotLottieReact className=""
                                style={{ width: "100%", height: "100%" }}
                                src="https://lottie.host/7af0aab9-f06a-4a96-9607-7ebe4486339b/0fYYVaUlOI.json" loop
                                autoplay direction="1" />
            </div>
        </div>
    </>;
}
