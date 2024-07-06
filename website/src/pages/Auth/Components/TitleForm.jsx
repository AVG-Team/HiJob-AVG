import Logo from "~/assets/img/favicon.png";
import React from "react";

export default function TitleForm({type}) {
    let title = "";
    let titleExcept = "";
    let btnExcept = "";
    let href = "";
    if (type === "login") {
        title = "Đăng nhập vào tài khoản của bạn";
        titleExcept = "Bạn chưa có tài khoản?";
        btnExcept = "Đăng ký ngay";
        href = "/register";
    } else if (type === "register") {
        title = "Đăng ký tài khoản";
        titleExcept = "Bạn đã có tài khoản?";
        btnExcept = "Đăng nhập ngay";
        href = "/login";
    } else if (type === "forgotPassword" || type === "changePassword") {
        title = "Quên mật khẩu";
        titleExcept = "Bạn đã nhớ tài khoản?";
        btnExcept = "Đăng nhập ngay";
        href = "/login";
    }


    return <div className="flex items-center flex-col">
        <img
            className="h-10 w-auto"
            src={Logo}
            alt="HI JOB"
        />
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
            {titleExcept}{" "}
            <a href={href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                {btnExcept}
            </a>
        </p>
    </div>
}