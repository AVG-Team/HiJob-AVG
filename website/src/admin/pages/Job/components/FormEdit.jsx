import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import jobApi from "../../../../services/apis/jobApi.js";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb.jsx";
import CustomInput from "../../../../components/Forms/Inputs/customColor.jsx";

export default function JobEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        responsibilities: '',
        requirements: '',
        benefits: '',
        requireOfYear: '',
        salary: '',
        companyName: '',
        userName: '',
    });
    const [errors, setErrors] = useState({});
    const [createdAt, setCreatedAt] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await jobApi.getJobById(id);
                setJob(response.data);
                setFormValues({
                    title: response.data.title || '',
                    description: response.data.description || '',
                    responsibilities: response.data.responsibilities || '',
                    requirements: response.data.requirements || '',
                    benefits: response.data.benefits || '',
                    requireOfYear: response.data.requireOfYear || '',
                    salary: response.data.salary || '',
                    companyName: response.data.companyName || '',
                    userName: response.data.userName || '',
                });
                setCreatedAt(response.data.createdAt ? dayjs(response.data.createdAt) : null);
                setUpdatedAt(response.data.updatedAt ? dayjs(response.data.updatedAt) : null);
            } catch (error) {
                console.error('Error fetching job:', error);
                toast.error('Failed to fetch job data');
            }
        };

        fetchJob();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (formValues.title.trim() === '') {
            validationErrors.title = 'Title is required';
        }

        if (formValues.salary === '' || isNaN(formValues.salary) || formValues.salary <= 0) {
            validationErrors.salary = 'Valid salary is required';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        if (createdAt) {
            formValues.createdAt = createdAt.format("YYYY-MM-DD");
        }
        if (updatedAt) {
            formValues.updatedAt = updatedAt.format("YYYY-MM-DD");
        }

        try {
            await jobApi.updateJob(id, formValues);
            toast.success('Cập nhật thông tin thành công');
            navigate('/admin/jobs');
        } catch (error) {
            console.error('Error updating job:', error);
            toast.error('Failed to update job');
        }
    };

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <Breadcrumb pageName="Sửa Công Việc" />
            </div>

            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5">
                    <h3 className="font-medium text-black">
                        Job Form
                    </h3>
                </div>
                <form method="post" onSubmit={handleSubmit} className="p-6.5">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tiêu Đề</label>
                        <input
                            className="w-full border border-gray-300 p-2 rounded"
                            type="text"
                            name="title"
                            value={formValues.title}
                            onChange={handleChange}
                            placeholder="Enter job title"
                            required
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Công Ty</label>
                        <CustomInput
                            disabled
                            className="w-full"
                            type="text"
                            value={formValues.companyName}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Nhà Tuyển Dụng</label>
                        <CustomInput
                            disabled
                            className="w-full"
                            type="text"
                            value={formValues.userName}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Mô tả</label>
                        <textarea
                            className="w-full border border-gray-300 p-2 rounded"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            placeholder="Enter job description"
                            required
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Trách nhiệm</label>
                        <textarea
                            className="w-full border border-gray-300 p-2 rounded"
                            name="responsibilities"
                            value={formValues.responsibilities}
                            onChange={handleChange}
                            placeholder="Enter responsibilities"
                        />
                        {errors.responsibilities && <p className="text-red-500 text-sm">{errors.responsibilities}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Yêu cầu</label>
                        <textarea
                            className="w-full border border-gray-300 p-2 rounded"
                            name="requirements"
                            value={formValues.requirements}
                            onChange={handleChange}
                            placeholder="Enter requirements"
                        />
                        {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Lợi ích</label>
                        <textarea
                            className="w-full border border-gray-300 p-2 rounded"
                            name="benefits"
                            value={formValues.benefits}
                            onChange={handleChange}
                            placeholder="Enter benefits"
                        />
                        {errors.benefits && <p className="text-red-500 text-sm">{errors.benefits}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Số năm kinh nghiệm</label>
                        <input
                            className="w-full border border-gray-300 p-2 rounded"
                            type="text"
                            name="requireOfYear"
                            value={formValues.requireOfYear}
                            onChange={handleChange}
                            placeholder="Enter required years of experience"
                            required
                        />
                        {errors.requireOfYear && <p className="text-red-500 text-sm">{errors.requireOfYear}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Lương</label>
                        <input
                            className="w-full border border-gray-300 p-2 rounded"
                            type="text"
                            name="salary"
                            value={formValues.salary}
                            onChange={handleChange}
                            placeholder="Enter salary"
                            required
                        />
                        {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Lưu
                    </button>
                </form>
            </div>
        </>
    );
}
