import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import jobTypeApi from '../../../../services/apis/jobTypeApi';
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb.jsx";

export default function CreateJobTypeForm() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        typeName: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form here
        const validationErrors = {};

        if (formValues.typeName.trim() === '') {
            validationErrors.typeName = 'Name is required';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            await jobTypeApi.createJobType(formValues);
            toast.success('Thêm loại công việc thành công');
            navigate('/admin/job-types');
        } catch (error) {
            console.error('Error creating job type:', error);
            toast.error('Thêm loại công việc thất bại');
        }
    };

    return (
        <>
            <div>
                <Breadcrumb pageName="Thêm Loại Công Việc"/>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black">
                        Create Job Type Form
                    </h3>
                </div>
                <form method="post" onSubmit={handleSubmit} className="p-6.5">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tên</label>
                        <input
                            className="w-full border border-gray-300 p-2 rounded"
                            type="text"
                            name="typeName"
                            value={formValues.typeName}
                            onChange={handleChange}
                            placeholder="Enter job type name"
                            required
                        />
                        {errors.typeName && <p className="text-red-500 text-sm">{errors.typeName}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Tạo
                    </button>
                </form>
            </div>
        </>
    );
}
