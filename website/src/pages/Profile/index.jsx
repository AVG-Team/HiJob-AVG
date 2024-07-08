import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import TabForm from "../../components/TabForm";
import { useNavigate } from "react-router-dom";
import UserInfo from "./components/UserInfo.jsx";
import FormProfile from "./components/FormProfile.jsx";
import RightProfile from "./components/RightProfile.jsx";
import { profile } from "../../services/apis/profile.js";
import ChangePassword from "./components/ChangePassword.jsx";
Profile.propTypes = {
    title: PropTypes.string,
};
export default function Profile(props) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [tabEdit, setTabEdit] = useState(true);
    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";
        getUserInfo();
    }, [title]);

    async function getUserInfo() {
        try {
            const response = await profile();
            setUserInfo(response.data);
        } catch (err) {
            navigate("/login");
            toast.error(err.message);
            console.error("Error fetching server: ", err);
        }
    }

    useEffect(() => {}, [userInfo]);

    return (
        <main className="flex items-center justify-center bg-gray-100 main-content">
            <div className="w-full lg:px-10">
                <div className="px-2 mt-5">
                    <TabForm id={1} />
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="pt-4 lg:py-4 lg:col-span-2">
                        {userInfo.email ? (
                            <>
                                <UserInfo userInfoContent={userInfo} tabEdit={tabEdit} setTabEdit={setTabEdit} />
                                <div className="flex items-center justify-center px-2 mt-5">
                                    <div className="w-full p-6 bg-white rounded shadow-lg lg:rounded-lg">
                                        {tabEdit ? <FormProfile userInfo={userInfo} /> : <ChangePassword />}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div>{userInfo.email && <RightProfile userInfo={userInfo} />}</div>
                </div>
            </div>
        </main>
    );
}
