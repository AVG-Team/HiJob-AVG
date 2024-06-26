// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Logo from "~/assets/img/favicon.png";
import CustomButton from "~/components/Forms/Button/customColor";
import CustomInput from "~/components/Forms/Inputs/customColor";

export default function ForgotPassword(props) {
    const title = props.title;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);

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
                            <form action="#" method="POST" className="space-y-6">
                                <div>
                                    <div className="mt-2">
                                        <CustomInput className="w-full" label="Email" type="email" autoComplete="email" required />
                                    </div>
                                </div>

                                <div>
                                    <CustomButton variant="contained" type="submit" className="w-full"
                                    >Forgot Password</CustomButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <DotLottieReact src="https://lottie.host/f0774770-0c02-40fb-8946-cd6f3ba17988/rR9TyEBHNN.json"
                                loop autoplay direction="1" />
            </div>
        </div>
    </>;
}