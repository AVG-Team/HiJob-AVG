import FormInput from "~/pages/Auth/Components/FormInput.jsx";
import React, { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "~/pages/Auth/Validate/validate.js";
import { toast } from "react-toastify";
import { authenticate } from "~/services/apis/auth.js";
import { useNavigate } from "react-router-dom";
import { GoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ShowError from "~/pages/Auth/Components/ShowError.jsx";
import { CustomLoadingButton } from "~/components/Forms/Button/customColor.jsx";

export default function Login(props) {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorString, setErrorString] = useState("");

    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
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
                .join("\n"));
        } else {
            try {
                setLoading(true);
                const response = await authenticate({ email, password, rememberMe: true });
                toast.success(response.message, {
                    onClose: () => navigate("/admin"),
                    autoClose: 2000,
                });
            } catch (err) {
                toast.error(err.message, {
                    autoClose: 1000,
                });
                setErrorString(err.message);
                console.error("Error fetching server: ", err);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" action="#" method="POST" onSubmit={handleSubmit}>
                        <FormInput
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                        />
                        <FormInput
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                        />
                        <ShowError errorString={errorString} />
                        <CustomLoadingButton variant="contained" type="submit" className="w-full" loading={loading}>
                            Sign In
                        </CustomLoadingButton>
                    </form>
                </div>
            </div>
        </>
    );
}
