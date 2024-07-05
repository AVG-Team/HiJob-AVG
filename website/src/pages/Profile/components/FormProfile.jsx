import CustomInput from "~/components/Forms/Inputs/customColor.jsx";
import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {provinces as provincesData, jobPositionsList} from "../../../mocks/data.js";
import SelectMulti from "~/components/Forms/Inputs/SelectMulti.jsx";
import {getAllSkills, updateUserInfo} from "../../../services/apis/profile.js";
import { CustomLoadingButton } from "~/components/Forms/Button/customColor.jsx";
import InputFileUpload from "../../../components/Forms/Inputs/InputFileUpload.jsx";
import {toast} from "react-toastify";

const FormProfile = ({userInfo, disabledForm, setDisabledForm}) => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        getAllSkillsData();
    }, []);
    const getAllSkillsData = async () => {
        try {
            const response = await getAllSkills();
            const skillsData = response.data.map(skill => skill.name);
            setSkills(skillsData);
            return response.data;
        } catch (err) {
            console.error("Error fetching server: ", err);
        }
    }

    if (!userInfo || Object.keys(userInfo).length === 0) {
        return <p>Loading...</p>;
    }

    const [formData, setFormData] = useState(userInfo);
    const [coverLetter, setCoverLetter] = useState(formData?.coverLetter || "");
    const [provinces, setProvinces] = useState(provincesData);
    const [errors, setErrors] = useState({});
    const [selectedProvince, setSelectedProvince] = useState(userInfo?.province ? userInfo.province : "");
    const [selectedJobPosition, setSelectedJobPosition] = useState(userInfo?.jobPosition ? userInfo.jobPosition : "");
    const [loading, setLoading] = useState(false);

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
        let formSubmit = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formSubmit.append(key, formData[key]);
            }
        }
        if (coverLetter != null) {
            console.log("coverLetter : " + coverLetter)
            console.log("coverLetter : " + coverLetter.name)
            formSubmit.append("coverLetter", coverLetter);
        }

        for (let pair of formSubmit.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            console.log(formSubmit)
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
                <label className="block text-sm font-medium text-gray-700 mb-3">Full Name</label>
                <CustomInput
                    disabled={disabledForm}
                    error={!!errors.fullName}
                    className="w-full"
                    type="text"
                    autoComplete="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your Full Name"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Email</label>
                <CustomInput
                    disabled={disabledForm}
                    error={!!errors.email}
                    className="w-full"
                    type="text"
                    autoComplete="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Phone</label>
                <CustomInput
                    disabled={disabledForm}
                    error={!!errors.phone}
                    className="w-full"
                    type="text"
                    autoComplete="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone"
                    required
                />
            </div>
            <div className="mb-4 md:grid md:grid-cols-3 gap-x-5">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Address</label>
                    <CustomInput
                        disabled={disabledForm}
                        error={!!errors.address}
                        className="w-full"
                        type="text"
                        autoComplete="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-8"> </label>
                    <FormControl fullWidth disabled={disabledForm}>
                        <InputLabel id="input-province">Province</InputLabel>
                        <Select
                            error={!!errors.province}
                            className="w-full"
                            name="province"
                            labelId="input-province"
                            label="Province"
                            value={selectedProvince}
                            onChange={handleChangeProvince}
                            renderValue={(selected) => {
                                if (selected === "" || selected === null || selected === undefined) {
                                    return <em style={{ opacity: "50%" }}>Select your Province</em>;
                                }

                                return selected;
                            }}
                        >
                            <MenuItem disabled value="">
                                <em>Select your Province</em>
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
                    <label className="block text-sm font-medium text-gray-700 mb-3">Job Position</label>
                    <Select
                        disabled={disabledForm}
                        displayEmpty
                        error={!!errors.jobPosition}
                        className="w-full"
                        name="jobPosition"
                        value={selectedJobPosition}
                        onChange={handleChangeJobPosition}
                        renderValue={(selected) => {
                            if (selected === "" || selected === null || selected === undefined) {
                                return <em style={{ opacity: "50%" }}>Select your Job Position</em>;
                            }

                            return selected;
                        }}
                    >
                        <MenuItem disabled value="">
                            <em>Select your Job Position</em>
                        </MenuItem>
                        {jobPositionsList.map((job) => (
                            <MenuItem key={job} value={job}>
                                {job}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 mt-4 md:mt-0">Year Experience</label>
                    <CustomInput
                        disabled={disabledForm}
                        error={!!errors.yearExperience}
                        className="w-full"
                        type="number"
                        autoComplete="yearExperience"
                        name="yearExperience"
                        value={formData.yearExperience}
                        onChange={handleChange}
                        placeholder="Enter your Year Experience"
                        required
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Skills</label>
                <SelectMulti listData={skills} data={formData.skills} textPlaceholder="Enter Your Skills" disabled={disabledForm} formData={formData} setFormData={setFormData}/>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Link Github : </label>
                <CustomInput
                    disabled={disabledForm}
                    error={!!errors.socialNetwork1}
                    className="w-full"
                    type="text"
                    autoComplete="socialNetwork1"
                    name="socialNetwork1"
                    value={formData.socialNetwork1}
                    onChange={handleChange}
                    placeholder="Enter your link github"

                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Link Linkedin : </label>
                <CustomInput
                    disabled={disabledForm}
                    error={!!errors.socialNetwork2}
                    className="w-full"
                    type="text"
                    autoComplete="socialNetwork2"
                    name="socialNetwork2"
                    value={formData.socialNetwork2}
                    onChange={handleChange}
                    placeholder="Enter your linkedin"

                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Upload CV : {formData?.coverLetter}</label>
                {!disabledForm && (
                    <InputFileUpload name="coverLetter" coverLetter={coverLetter} setCoverLetter={setCoverLetter} />
                )}
            </div>

            {!disabledForm && (
                <CustomLoadingButton variant="contained" type="submit" className="w-full" loading={loading}>
                    Save
                </CustomLoadingButton>
            )}
        </form>
    );
}
export default FormProfile;
