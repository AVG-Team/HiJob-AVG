import { useState } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
import { toast } from "react-toastify";
import jobApi from "../../../services/apis/jobApi";
import jobTypeApi from "../../../services/apis/jobTypeApi.js";
import jobSkillApi from "../../../services/apis/jobSkillApi.js";
import jobLevelApi from "../../../services/apis/jobLevelApi.js";
import contractTypeApi from "../../../services/apis/contractTypeApi.js";
import companyApi from "../../../services/apis/companyApi";
import { profile, getUser } from "../../../services/apis/profile.js";

Form.propTypes = {
    levels: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired,
    contracts: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
};

export default function Form({ levels, types, contracts, skills }) {
    const [selected, setSelected] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        responsibility: "",
        requirement: "",
        benefits: "",
        requireOfYear: "",
        salary: "",
        level: 0,
        type: 0,
        contract: 0,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const profileUser = await profile();
            console.log("Profile user:", profileUser);
            const user = await getUser(profileUser.data.email);
            console.log("User:", user.data.id);
            const company = await companyApi.getCompanyByUserId(user.data.id);
            console.log("Company:", company.data.id);

            const dataJob = {
                title: formData.title,
                description: formData.description,
                responsibilities: formData.responsibility,
                requirements: formData.requirement,
                benefits: formData.benefits,
                requireOfYear: formData.requireOfYear,
                salary: parseInt(formData.salary, 10) || 0,
                companyId: company.data.id,
                userId: user.data.id,
            };
            const response = await jobApi.createJob(dataJob);

            const jobId = response.data.id;
            const level = {
                jobId: jobId,
                levelId: formData.level,
            };
            console.log(formData.level);
            const levelResponse = await jobLevelApi.create(level);
            console.log("level" + levelResponse.data);

            console.log(formData.type);
            const type = {
                jobId: jobId,
                jobTypeId: formData.type,
            };
            const typeResponse = await jobTypeApi.create(type);
            console.log("type" + typeResponse.data);

            const contract = {
                jobId: jobId,
                contractTypeId: formData.contract,
            };
            const contractResponse = await contractTypeApi.create(contract);
            console.log("contract" + contractResponse.data);

            for (const skill of selected) {
                const skillResponse = await jobSkillApi.create({
                    jobId: jobId,
                    skillId: skill.value,
                });
                console.log("skill" + skillResponse.data);
            }

            toast.success("Ứng tuyển thành công");
            console.log("Job application response:", response.data);
        } catch (error) {
            console.error("Error submitting job application:", error);
            toast.error("Đã xảy ra lỗi khi ứng tuyển");
        }
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-lg ">
            <div className="flex items-center justify-center p-4 border-b">
                <h5 className="text-xl font-bold">
                    Tuyển Dụng Của Công Ty <span className="text-secondary">DEK TECHNOLOGIES</span>
                </h5>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                            Tên Công Việc
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            placeholder="Java Developer"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                                Mô tả
                            </label>
                            <textarea
                                id="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="responsibility">
                                Trách nhiệm công việc
                            </label>
                            <textarea
                                id="responsibility"
                                rows="5"
                                value={formData.responsibility}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="requirement">
                                Kỹ Năng Và Chuyên Môn
                            </label>
                            <textarea
                                id="requirement"
                                rows="5"
                                value={formData.requirement}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="benefits">
                                Phúc Lợi Cho Bạn
                            </label>
                            <textarea
                                id="benefits"
                                rows="5"
                                value={formData.benefits}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="requireOfYear">
                                Kinh nghiệm
                            </label>
                            <input
                                type="number"
                                id="requireOfYear"
                                value={formData.requireOfYear}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                placeholder="Kinh nghiệm"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="salary">
                                Lương
                            </label>
                            <input
                                type="number"
                                id="salary"
                                value={formData.salary}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                placeholder="Lương"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="level">
                                Cấp bậc
                            </label>
                            <select
                                id="level"
                                value={formData.level}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            >
                                <option value={0}>Chọn cấp bậc</option>
                                {levels.map((level) => (
                                    <option key={level.id} value={level.id}>
                                        {level.levelName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="type">
                                Loại Hình Làm Việc
                            </label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            >
                                <option value={0}>Chọn loại hình làm việc</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.typeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="contract">
                                Loại Hợp Đồng
                            </label>
                            <select
                                id="contract"
                                value={formData.contract}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            >
                                <option value={0}>Chọn loại hợp đồng</option>
                                {contracts.map((contract) => (
                                    <option key={contract.id} value={contract.id}>
                                        {contract.typeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-4 ">
                        <div className="col-span-1">
                            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="skills">
                                Kĩ năng
                            </label>
                            {selected.map((skill) => (
                                <span
                                    key={skill.value}
                                    className="px-2 py-1 mb-2 ml-2 text-sm text-white rounded-md bg-primary hover:bg-primary-600 hover:shadow-lg"
                                >
                                    {skill.label}
                                </span>
                            ))}
                            <MultiSelect
                                options={skills.map((skill) => ({ label: skill.skillName, value: skill.id }))}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                                className="block w-full p-2 mt-4 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end col-span-1">
                        <button
                            type="submit"
                            className="py-3 font-bold text-white uppercase rounded-lg shadow-lg px-9 bg-primary lg:mx-0 hover:bg-primary-700 hover:shadow-lg"
                        >
                            Ứng tuyển
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
