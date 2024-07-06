import React, {useEffect, useState} from "react";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {authenticate} from "~/services/apis/auth.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {validateEmail, validatePassword} from "../../../services/validate/validate.js";
import Oauth2 from "../Components/Oauth2.jsx"
import TitleForm from "../Components/TitleForm.jsx";
import AuthForm from "../Components/AuthForm.jsx";

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
        document.title = title ? `${title}` : "Trang không tồn tại";
    }, [title]);

    async function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = {};
        validationErrors.email = validateEmail(email);
        if (validationErrors.email === "") delete validationErrors.email;
        validationErrors.password = validatePassword(password);
        if (validationErrors.password === "") delete validationErrors.password;
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) {
            setErrorString(Object.entries(validationErrors)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n'));
        } else {
            try {
                setLoading(true);
                const response = await authenticate({ email, password, rememberMe: remember });
                toast.success(response.message, {
                    onClose: () => navigate('/'),
                    autoClose: 2000
                });
            } catch (err) {
                toast.error(err.message);
                setErrorString(err.message)
                console.error("Error fetching server: ", err);

            } finally {
                setLoading(false);
            }
        }
    }

    return <>
        <div className="min-h-full grid lg:grid-cols-2 lg:gap-4">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <TitleForm type="login"/>
                    <div className="mt-10">
                        <AuthForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            errors={errors}
                            errorString={errorString}
                            loading={loading}
                            remember={remember}
                            setRemember={setRemember}
                            showRePassword={false}
                            type={"login"}
                        />
                        <Oauth2 />
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <DotLottieReact
                    style={{width: "100%", height: "100%"}}
                    src="https://lottie.host/7af0aab9-f06a-4a96-9607-7ebe4486339b/0fYYVaUlOI.json" loop
                    autoplay direction="1"/>
            </div>
        </div>
    </>;
}
