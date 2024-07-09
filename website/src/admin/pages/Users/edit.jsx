import React, {useEffect, useState} from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.jsx";
import Forms from "./Components/forms.jsx";
import {toast} from "react-toastify";
import {getUserInfo as getUserData} from "../../../services/apis/admin/users.js";
import {useParams} from "react-router-dom";

export default function Create(props) {
    const [userInfo, setUserInfo] = useState({
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
    });
    const { id } = useParams();

    async function getUserInfo() {
        try {
            const response = await getUserData(id);
            setUserInfo(response.data);
        } catch (err) {
            toast.error(err.message);
            console.error("Error fetching server: ", err);
        }
    }

    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";
        getUserInfo().then();
    }, [title]);

    return (
        <>
            <div>
                <Breadcrumb pageName="Sửa Người Dùng"/>
            </div>

            <div
                className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black ">
                        Thông Tin Người Dùng
                    </h3>
                </div>
                {userInfo.email === "" ?(
                    <div className="flex justify-center items-center h-96">
                        <p className="text-lg font-medium text-black">Loading.....</p>
                    </div>
                ):(
                    <Forms userInfo={userInfo} typeForm="edit"/>
                )}
            </div>
        </>
    )
}