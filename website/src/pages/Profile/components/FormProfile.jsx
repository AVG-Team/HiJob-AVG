import CustomInput from "~/components/Forms/Inputs/customColor.jsx";
import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {provinces as provincesData, jobPositionsList} from "../../../mocks/data.js";
import SelectMulti from "~/components/Forms/Inputs/SelectMulti.jsx";
import {getAllSkills, updateUserInfo} from "../../../services/apis/profile.js";
import { CustomLoadingButton } from "~/components/Forms/Button/customColor.jsx";
import InputFileUpload from "../../../components/Forms/Inputs/InputFileUpload.jsx";
import {toast} from "react-toastify";
import {FilesUrl} from "../../../services/key/url.js";
import {
    validateAddress,
    validateEmail, validateFile,
    validateFullName, validateJobPosition, validateLink, validateNumber,
    validatePassword,
    validatePhone, validateProvince, validateSkills
} from "../../../services/validate/validate.js";
import DatePickerValue from "../../../components/Forms/Inputs/InputDate.jsx";
import dayjs from "dayjs";

const FormProfile = ({userInfo}) => {
    const [formData, setFormData] = useState(userInfo);
    const [skills, setSkills] = useState([]);
    let initialFormData = {};
    useEffect(() => {
        getAllSkillsData().then();
        initialFormData = {...formData};
    }, []);
    const getAllSkillsData = async () => {
        try {
            const response = await getAllSkills();
            const skillsData = response.data.map(skill => skill.skillName);
            setSkills(skillsData);
            return response.data;
        } catch (err) {
            console.error("Error fetching server: ", err);
        }
    }

    if (!userInfo || Object.keys(userInfo).length === 0) {
        return <p>Loading...</p>;
    }

    const [coverLetter, setCoverLetter] = useState(formData?.coverLetter || "");
    const [provinces, setProvinces] = useState(provincesData);
    const [errors, setErrors] = useState({});
    const [errorString, setErrorString] = useState("");
    const [selectedProvince, setSelectedProvince] = useState(userInfo?.province ? userInfo.province : "");
    const [selectedJobPosition, setSelectedJobPosition] = useState(userInfo?.jobPosition ? userInfo.jobPosition : "");
    const [loading, setLoading] = useState(false);
    const [birthdate, setBirthdate] = useState(formData?.birthday ? dayjs(formData.birthday) : null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleChangeProvince = (event) => {
        const value = event.target.value || '';
        setSelectedProvince(value);
        setFormData({
            ...formData,
            province: value
        });
    };
    const handleChangeJobPosition = (event) => {
        const value = event.target.value || '';
        setSelectedJobPosition(value);
        setFormData({
            ...formData,
            jobPosition: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Validate
        const validationErrors = {};

        if (formData["fullName"] !== userInfo["fullName"]) {
            validationErrors.fullName = validateFullName(formData["fullName"]);
            if (validationErrors.fullName === "") delete validationErrors.fullName;
        }

        if (formData["email"] !== userInfo["email"]) {
            validationErrors.email = validateEmail(formData["email"]);
            if (validationErrors.email === "") delete validationErrors.email;
        }

        if (formData["phone"] !== userInfo["phone"]) {
            validationErrors.phone = validatePhone(formData["phone"]);
            if (validationErrors.phone === "") delete validationErrors.phone;
        }

        if (formData["address"] !== userInfo["address"]) {
            validationErrors.address = validateAddress(formData["address"]);
            if (validationErrors.address === "") delete validationErrors.address;
        }

        if (formData["province"] !== userInfo["province"]) {
            validationErrors.province = validateProvince(formData["province"]);
            if (validationErrors.province === "") delete validationErrors.province;
        }

        if (formData["jobPosition"] !== userInfo["jobPosition"]) {
            validationErrors.jobPosition = validateJobPosition(formData["jobPosition"]);
            if (validationErrors.jobPosition === "") delete validationErrors.jobPosition;
        }

        if (formData["yearExperience"] !== userInfo["yearExperience"]) {
            validationErrors.yearExperience = validateNumber(formData["yearExperience"]);
            if (validationErrors.yearExperience === "") delete validationErrors.yearExperience;
        }

        if (formData["skills"] !== userInfo["skills"]) {
            validationErrors.skills = validateSkills(formData["skills"], skills);
            if (validationErrors.skills === "") delete validationErrors.skills;
        }

        if (formData["socialNetwork1"] !== userInfo["socialNetwork1"]) {
            validationErrors.socialNetwork1 = validateLink(formData["socialNetwork1"]);
            if (validationErrors.socialNetwork1 === "") delete validationErrors.socialNetwork1;
        }

        if (formData["socialNetwork2"] !== userInfo["socialNetwork2"]) {
            validationErrors.socialNetwork2 = validateLink(formData["socialNetwork2"]);
            if (validationErrors.socialNetwork2 === "") delete validationErrors.socialNetwork2;
        }

        if (coverLetter.name !== userInfo["coverLetter"]) {
            validationErrors.coverLetter = validateFile(formData["coverLetter"]);
            if (validationErrors.coverLetter === "") delete validationErrors.coverLetter;
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length !== 0) {
            setErrorString(Object.entries(validationErrors)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n'));
            return;
        }

        if (birthdate != null && birthdate.format("YYYY-MM-DD") !== userInfo["birthday"]) {
            formData.birthday = birthdate.format("YYYY-MM-DD");
        }

        // Handle Form
        let formSubmit = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formSubmit.append(key, formData[key]);
            }
        }

        if (coverLetter !== userInfo["coverLetter"]) {
            console.log("coverLetter : " + coverLetter)
            console.log("coverLetter : " + coverLetter.name)
            formSubmit.append("coverLetter", coverLetter);
        } else {
            formSubmit.delete("coverLetter");
        }

        for (let pair of formSubmit.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            const response = await updateUserInfo(formSubmit);
            toast.success(response.message, {
                autoClose: 1000
            });
        } catch (error) {
            console.error('There was an error!', error);
            toast.error(error.message, {
                autoClose: 1000
            });
        }
    };
    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Họ và tên</label>
                <CustomInput
                    error={!!errors.fullName}
                    className="w-full"
                    type="text"
                    autoComplete="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Email</label>
                <CustomInput
                    error={!!errors.email}
                    className="w-full"
                    type="text"
                    autoComplete="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Nhập email"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Số điện thoại</label>
                <CustomInput
                    error={!!errors.phone}
                    className="w-full"
                    type="text"
                    autoComplete="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Ngày Sinh</label>
                <DatePickerValue value={birthdate} setValue={setBirthdate}/>
            </div>
            <div className="mb-4 md:grid md:grid-cols-3 gap-x-5">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Địa chỉ</label>
                    <CustomInput
                        error={!!errors.address}
                        className="w-full"
                        type="text"
                        autoComplete="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-8"> </label>
                    <FormControl fullWidth>
                        <InputLabel id="input-province">Tỉnh thành</InputLabel>
                        <Select
                            error={!!errors.province}
                            className="w-full"
                            name="province"
                            labelId="input-province"
                            label="Tỉnh thành"
                            value={selectedProvince}
                            onChange={handleChangeProvince}
                            renderValue={(selected) => {
                                if (selected === "" || selected === null || selected === undefined) {
                                    return <em style={{opacity: "50%"}}>Chọn tỉnh thành</em>;
                                }

                                return selected;
                            }}
                        >
                            <MenuItem disabled value="">
                                <em>Chọn tỉnh thành</em>
                            </MenuItem>
                            {provinces.map((province) => (
                                <MenuItem key={province.idProvince} value={province.name}>
                                    {province.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="mb-4 md:grid md:grid-cols-3 gap-x-5">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Vị trí công việc</label>
                    <Select
                        displayEmpty
                        error={!!errors.jobPosition}
                        className="w-full"
                        name="jobPosition"
                        value={selectedJobPosition}
                        onChange={handleChangeJobPosition}
                        renderValue={(selected) => {
                            if (selected === "" || selected === null || selected === undefined) {
                                return <em style={{opacity: "50%"}}>Chọn vị trí công việc</em>;
                            }

                            return selected;
                        }}
                    >
                        <MenuItem disabled value="">
                            <em>Chọn vị trí công việc</em>
                        </MenuItem>
                        {jobPositionsList.map((job) => (
                            <MenuItem key={job} value={job}>
                                {job}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 mt-4 md:mt-0">Số năm kinh nghiệm</label>
                    <CustomInput
                        error={!!errors.yearExperience}
                        className="w-full"
                        type="number"
                        autoComplete="yearExperience"
                        name="yearExperience"
                        value={formData.yearExperience}
                        onChange={handleChange}
                        placeholder="Nhập số năm kinh nghiệm"
                        required
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Kỹ năng</label>
                <SelectMulti listData={skills} data={formData.skills} textPlaceholder="Nhập kỹ năng của bạn"
                             formData={formData} setFormData={setFormData}/>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Link Github : </label>
                <CustomInput
                    error={!!errors.socialNetwork1}
                    className="w-full"
                    type="text"
                    autoComplete="socialNetwork1"
                    name="socialNetwork1"
                    value={formData.socialNetwork1}
                    onChange={handleChange}
                    placeholder="Nhập link Github"

                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Link Linkedin : </label>
                <CustomInput
                    error={!!errors.socialNetwork2}
                    className="w-full"
                    type="text"
                    autoComplete="socialNetwork2"
                    name="socialNetwork2"
                    value={formData.socialNetwork2}
                    onChange={handleChange}
                    placeholder="Nhập link Linkedin"

                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3"
                >Tải CV :
                    <a className="text-primary cursor-pointer ml-1"
                       href={formData?.coverLetter != null ? FilesUrl + formData?.coverLetter : ""}
                       download target="_blank"
                    > {formData?.coverLetter}</a>
                </label>
                <InputFileUpload name="coverLetter" coverLetter={coverLetter} setCoverLetter={setCoverLetter}/>
            </div>

            <CustomLoadingButton variant="contained" type="submit" className="w-full" loading={loading}>
                Lưu
            </CustomLoadingButton>

            <div className="mt-2">
                <div
                    className={`bg-red-100 text-red-500 p-4 ${errorString.length !== 0 ? "" : "hidden"}`}
                    role="alert">
                    {errorString}
                </div>
            </div>
        </form>
    );
}
export default FormProfile;
