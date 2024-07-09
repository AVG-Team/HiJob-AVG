// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Logo from "~/assets/img/favicon.png";
import CustomInput from "~/components/Forms/Inputs/customColor";
import {useNavigate} from "react-router-dom";
import {CustomLoadingButton} from "../../../components/Forms/Button/customColor.jsx";
import {forgotPassword} from "../../../services/apis/auth.js";
import {toast} from "react-toastify";
import {validateEmail} from "../../../services/validate/validate.js";
import TitleForm from "../Components/TitleForm.jsx";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import AuthForm from "../Components/AuthForm.jsx";

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
        document.title = title ? `${title}` : "Trang không tồn tại";
    }, [title]);

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        validationErrors.email = validateEmail(email);
        if (validationErrors.email === "") delete validationErrors.email;
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) {
            setErrorString(Object.entries(validationErrors)
                .map(([key, value]) => `${key} : ${value}`)
                .join('\n'));
        } else {
            try {
                setLoading(true);
                const response = await forgotPassword({email, recaptchaToken});
                toast.success(response.message, {
                    onClose: () => navigate('/notify?type=forgotPassword'),
                    autoClose: 2000,
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
                    <TitleForm type="forgotPassword"/>
                    <div className="mt-10">
                        <div>
                            <GoogleReCaptchaProvider reCaptchaKey={siteKey} language="vi">
                                <AuthForm
                                    handleSubmit={handleSubmit}
                                    email={email}
                                    setEmail={setEmail}
                                    errors={errors}
                                    errorString={errorString}
                                    loading={loading}
                                    showRePassword={true}
                                    type={"forgotPassword"}
                                    recaptchaToken={recaptchaToken}
                                    setRecaptchaToken={setRecaptchaToken}
                                />
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