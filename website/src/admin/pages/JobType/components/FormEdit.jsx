import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import jobTypeApi from '../../../../services/apis/jobTypeApi';
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb.jsx";

export default function EditJobTypeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobType, setJobType] = useState(null);
    const [formValues, setFormValues] = useState({
        typeName: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchJobType = async () => {
            try {
                const response = await jobTypeApi.getJobTypeById(id);
                setJobType(response.data);
                setFormValues({
                    typeName: response.data.typeName || ''
                });
            } catch (error) {
                console.error('Error fetching job type:', error);
                toast.error('Failed to fetch job type data');
            }
        };

        fetchJobType();
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
            await jobTypeApi.updateJobType(id, formValues);
            toast.success('Job Type updated successfully');
            navigate('/admin/job-types');
        } catch (error) {
            console.error('Error updating job type:', error);
            toast.error('Failed to update job type');
        }
    };

    if (!jobType) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <Breadcrumb pageName="Sửa Loại Công Việc"/>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black">
                        Job Type Form
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
                        Lưu
                    </button>
                </form>
            </div>
        </>
    );
}
