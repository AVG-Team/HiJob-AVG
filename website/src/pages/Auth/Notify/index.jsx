import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Logo from "~/assets/img/favicon.png";
import CustomButton from "~/components/Forms/Button/customColor";
import CustomInput from "~/components/Forms/Inputs/customColor";
import {register as registerAxios, verifyEmail} from "../../../services/apis/auth.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Notify(props) {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [token, setToken] = useState("");

    // eslint-disable-next-line react/prop-types
    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";

        const urlParams = new URLSearchParams(window.location.search);
        const typeParam = urlParams.get('type');
        setType(typeParam);
        setToken(urlParams.get('token'));
    }, [title]);

    useEffect(() => {
        if (type === "verifyEmailSuccess") {
            setMessage("Your account has been successfully verified. You can now login to your account.");
            console.log("1234")
            handleCheckVerify().then(r => console.log(r));
        } else if(type === "verifyEmail") {
            setMessage("An email has been sent to your email address. Please check your email to verify your account.");
        } else if (type === "forgotPassword") {
            setMessage("An email has been sent to your email address. Please check your email to reset your password.");
        }
    }, [type, token]);

    const handleCheckVerify = async() => {
        if (!token || !token.startsWith("AVG_") || !token.endsWith("_HIJOB")) {
            console.log("in function")
            const messageToast = "Invalid token. Please try again.";
            toast.error(messageToast, {
                // onClose: () => navigate('/'),
                autoClose: 2000,
                buttonClose: false
            });
            return;
        }

        const request = axios.create({
            baseURL: "http://localhost:8080/api/",
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            const response = await verifyEmail({
                token: token,
            });
            let message = response.message;
            toast.success(message, {
                onClose: () => navigate('/'),
                autoClose: 2000,
                buttonClose: false
            });
        } catch (err) {
            toast.error(err.message);
            console.error("Error fetching server: ", err);
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
                            Notification
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Thank you for using our service. Thank you for your trust in us.{" "}
                            <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Visit our homepage
                            </a>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div>
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                                {message}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <DotLottieReact src="https://lottie.host/59f5e53d-ce7c-4d60-aaa9-7ba750fc86a8/OhazetStzz.json"
                                loop autoplay direction="1" />
            </div>
        </div>
    </>;
}