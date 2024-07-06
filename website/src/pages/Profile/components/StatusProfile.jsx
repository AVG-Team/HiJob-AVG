import React, {useEffect, useState} from "react";
import {CustomLoadingButton} from "~/components/Forms/Button/customColor.jsx";
import {updateJobStatus} from "../../../services/apis/profile.js";
import {toast} from "react-toastify";

export default function StatusProfile({status}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [btnText, setBtnTexts] = useState("");
    const [statusData, setStatusData] = useState(status);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (statusData === true) {
            setTitle("Bạn đang ở trạng thái Tìm việc !!!");
            setDescription("Bạn có muốn từ chối những nhà tuyển dụng đang tìm kiếm bạn?");
            setBtnTexts("Tắt trạng thái Tìm việc");
        } else {
            setTitle("Sẵn sàng cho những cơ hội mới?");
            setDescription("Cho phép nhà tuyển dụng tìm kiếm và xem CV của bạn.");
            setBtnTexts("Bật trạng thái Tìm việc");
        }
    }, [statusData]);

    async function changeStatus(event) {
        try {
            const response = await updateJobStatus({jobStatus: !statusData});
            toast.success(response.message);
            setStatusData(!statusData);

        } catch (err) {
            toast.error(err.message);
            console.error("Error fetching server: ", err);
        }
    }

    return (
        <>
            <div className="card-body flex gap-4 bg-white px-6 pb-4 pt-6 lg:flex-col rounded-t-md">
                <h3 className="font-semibold text-lg hidden lg:block text-center">{title}</h3>
                <img
                    alt="banner otw"
                    loading="lazy"
                    src="https://c.topdevvn.com/v4/_next/static/media/bannerOTW.580cbf45.svg"
                    className="m-auto h-[87px] w-[94px] sm:h-[119px] sm:w-[122px]"
                />
                <div className="flex flex-col gap-2 justify-center lg:justify-normal">
                    <h3 className="font-semibold lg:text-lg block lg:hidden">{title}</h3>
                    <div className="text-gray-400 lg:text-center">
                        {description}
                    </div>
                </div>
            </div>

            <button
                className={`card-title flex justify-center p-4 rounded-b-md w-full ${
                    statusData === true
                        ? 'text-red-500 bg-red-300 hover:bg-red-500 hover:text-white'
                        : 'text-white bg-primary-200 hover:bg-primary-500'
                } hover:font-bold duration-300 ease-in-out transition-colors transition-font`}
                onClick={changeStatus}
            >{btnText}</button>
        </>
    )
}