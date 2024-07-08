import { useState } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from "react-multi-select-component";
// import jobApi from "../../../services/apis/jobApi";
// import jobTypeApi from "../../../services/apis/jobTypeApi";
// import jobLevelApi from "../../../services/apis/jobLevelApi";
// import contractTypeApi from "../../../services/apis/contractTypeApi";
// import jobSkillApi from "../../../services/apis/jobSkillApi";

Form.propTypes = {
    levels: PropTypes.array.isRequired,
    types: PropTypes.array.isRequired,
    contracts: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
};

export default function Form({ levels, types, contracts, skills }) {
    const [selected, setSelected] = useState([]);
    // const [job, setJob] = useState({});
    // const [jobType, setJobType] = useState({});
    // const [jobLevel, setJobLevel] = useState({});
    // const [contractType, setContractType] = useState({});
    // const [jobSkill, setJobSkill] = useState({});

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await jobApi.createJob(job);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log("Failed to create job: ", error);
    //     }
    // };
    return (
        <div className="w-full bg-white rounded-lg shadow-lg ">
            <div className="flex items-center justify-center p-4 border-b">
                <h5 className="text-xl font-bold">
                    Tuyển Dụng Của Công Ty <span className="text-secondary">DEK TECHNOLOGIES</span>
                </h5>
            </div>
            <div className="p-4">
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                            Tên Công Việc
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            placeholder="Java Developer"
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
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="responsibility">
                                Trách nhiệm công việc
                            </label>
                            <textarea
                                id="responsibility"
                                rows="5"
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
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
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="benefits">
                                Phúc Lợi Cho Bạn
                            </label>
                            <textarea
                                id="benefits"
                                rows="5"
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="level">
                                Cấp bậc
                            </label>
                            <select
                                id="level"
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            >
                                <option defaultValue={0}>Chọn cấp bậc</option>
                                {levels.map((level) => (
                                    <option key={level.id}>{level.levelName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="contract">
                                Loại Hình Làm Việc
                            </label>
                            <select
                                id="contract"
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            >
                                <option defaultValue={0}>Chọn loại hình làm việc</option>
                                {types.map((type) => (
                                    <option key={type.id}>{type.typeName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="contract">
                                Loại Hợp Đồng
                            </label>
                            <select
                                id="contract"
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            >
                                <option defaultValue={0}>Chọn loại hợp đồng</option>
                                {contracts.map((contract) => (
                                    <option key={contract.id}>{contract.typeName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-4 ">
                        <div className="col-span-1">
                            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="description">
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
