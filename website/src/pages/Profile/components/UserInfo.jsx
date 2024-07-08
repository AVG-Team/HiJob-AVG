import {useEffect, useRef, useState} from "react";
import CustomButton from "~/components/Forms/Button/customColor.jsx";
import {CustomButtonGray} from "~/components/Forms/Button/customColor.jsx";
import UploadIcon from '@mui/icons-material/Upload';
import {updateAvatar} from "../../../services/apis/profile.js";
import {toast} from "react-toastify";
import {AvatarUrl} from "../../../services/key/url.js";

const UserInfo = ({userInfoContent, tabEdit, setTabEdit}) => {
    const [userInfo, setUserInfo] = useState({})
    const [skills, setSkills] = useState([])
    const fileInputRef = useRef(null);
    const [avatar, setAvatar] = useState(AvatarUrl + userInfoContent.avatar);

    useEffect(() => {
        setUserInfo(userInfoContent)
        const skillsArray = userInfoContent.skills?.split(',').map(skill => `#${skill.trim()}`);
        setSkills(skillsArray?.slice(0, 5))
    }, []);

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserInfo({ ...userInfo, avatar: reader.result });
                setAvatar(reader.result)
            };
            reader.readAsDataURL(selectedFile);


            try {
                console.log(selectedFile)
                const formData = new FormData();
                formData.append("avatar", selectedFile);
                const response = await updateAvatar(formData);
                console.log(response)
                toast.success(response.message, {
                    autoClose: 1000
                });
            } catch (err) {
                toast.error(err.message, {
                    autoClose: 1000,
                });
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-full px-2">
            <div className="w-full py-6 bg-white rounded shadow-lg sm:grid sm:grid-cols-3">
                <div className="group flex justify-center items-center mx-5 relative cursor-pointer" onClick={handleDivClick}>
                    <img
                        className="sm:w-[100%] w-[80%] rounded-full group-hover:opacity-50 transition-opacity duration-300"
                        src={avatar ? ( avatar ) : "https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png"}
                        alt="Avatar"
                    />
                    <input type="file" className="hidden" accept="image/*"
                           ref={fileInputRef} onChange={handleFileChange}/>
                    <div className="absolute">
                        <UploadIcon
                            className="cursor-pointer !w-12 !h-12 opacity-0 group-hover:!opacity-80 transition-opacity duration-300"
                        />
                    </div>
                </div>
                <div className="flex items-center sm:col-span-2 sm:mt-0 mt-5 justify-center sm:justify-normal">
                    <div className="leading-8 text-center sm:text-left">
                        <h2 className="text-lg font-bold sm:text-xl">{userInfo.fullName}</h2>
                        <div className="flex flex-row items-center mt-2 justify-center sm:justify-normal">
                            <p className="text-sm text-gray-500 sm:mr-4 mr-2">Account Status : </p>
                            <p className={`text-sm font-bold ${userInfo.isActive ? "text-primary" : "text-red-500"}`}>{userInfo.isActive ? "Active" : "Pending"}</p>
                        </div>
                        <div className="flex flex-wrap mt-2 justify-center sm:justify-normal">
                            <p className="text-sm text-gray-500 sm:mr-4">{userInfo.role}</p>
                            <p className="text-sm text-gray-500 sm:mr-4">{userInfo.jobPosition}</p>
                            <p className="text-sm text-gray-500 sm:mr-4">{userInfo.yearExperience} Year</p>
                            <p className="text-sm text-gray-500">{userInfo.email}</p>
                        </div>
                        <div className="flex flex-wrap mt-2 justify-center sm:justify-normal">
                            {skills?.map((skill, index) => (
                                <p key={index}
                                   className="text-sm text-primary mr-2 bg-gray-100 p-1 cursor-pointer">{skill}</p>
                            ))}

                            <p className="text-sm text-primary mr-2 bg-gray-100 p-1 cursor-pointer">...</p>
                        </div>
                        <div className="mt-4">
                            <CustomButton variant="contained" type="submit"
                                          className={`!py-2 !px-4 !mr-4 ${tabEdit && "!bg-gray-500 !cursor-not-allowed"}`}
                                          onClick={() => setTabEdit(true)}
                            >Chỉnh sửa thông tin</CustomButton>
                            <CustomButton variant="contained" type="submit"
                                          className={`!py-2 !px-4 ${!tabEdit && "!bg-gray-500 !cursor-not-allowed"}`}
                                          onClick={() => setTabEdit(false)}
                            >Đổi mật khẩu</CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
