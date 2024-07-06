// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {register as registerAxios} from "../../../services/apis/auth.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {validateEmail, validatePassword} from "../../../services/validate/validate.js";
import TitleForm from "../Components/TitleForm.jsx";
import AuthForm from "../Components/AuthForm.jsx";
import Oauth2 from "../Components/Oauth2.jsx";

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
        validationErrors.email = validateEmail(email);
        if (validationErrors.email === "") delete validationErrors.email;
        validationErrors.password = validatePassword(password);
        validationErrors.password = validatePassword(rePassword);
        if (validationErrors.password === "") delete validationErrors.password;

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) {
            setErrorString(Object.entries(validationErrors)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n'));
        } else {
            try {
                setLoading(true);
                const response = await registerAxios({email, password});
                toast.success(response.message, {
                    onClose: () => navigate('/notify?type=verifyEmail'),
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
    };

    return <>
        <div className="min-h-full grid lg:grid-cols-2 lg:gap-4">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <TitleForm type="register"/>
                    <div className="mt-10">
                        <AuthForm
                            handleSubmit={handleSubmit}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            rePassword={rePassword}
                            setRePassword={setRePassword}
                            errors={errors}
                            errorString={errorString}
                            loading={loading}
                            showRePassword={true}
                            type={"register"}
                        />
                        <Oauth2 />

                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <DotLottieReact src="https://lottie.host/9b81d0b3-d8fc-4e1e-a646-722edc9a6f32/fX94e8juVb.json"
                                loop autoplay direction="1"/>
            </div>
        </div>
    </>;
}