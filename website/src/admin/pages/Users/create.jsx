import React, {useEffect, useState} from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.jsx";
import Forms from "./Components/forms.jsx";

export default function Create(props) {
    const userInfo = {
        fullName: "",
        email: "",
        phone: "",
        birthday: "",
        address: "",
        province: "",
        jobPosition: "",
        yearExperience: "",
        skills: "",
        socialNetwork1: "",
        socialNetwork2: "",
        coverLetter: "",
        avatar: "",
    };

    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";
    }, [title]);

    return (
        <>
            <div>
                <Breadcrumb pageName="Tạo Người Dùng"/>
            </div>

            <div
                className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black ">
                        Contact Form
                    </h3>
                </div>
                <Forms userInfo={userInfo} typeForm="create"/>
            </div>
        </>
    )
}