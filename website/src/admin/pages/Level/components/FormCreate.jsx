import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import levelApi from '../../../../services/apis/levelApi';
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb.jsx";

export default function CreateLevelForm() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        levelName: ''
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

        if (formValues.levelName.trim() === '') {
            validationErrors.levelName = 'Name is required';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            await levelApi.createLevel(formValues);
            toast.success('Thêm level thành công');
            navigate('/admin/levels');
        } catch (error) {
            console.error('Error creating level:', error);
            toast.error('Thêm level thất bại');
        }
    };

    return (
        <>
            <div>
                <Breadcrumb pageName="Thêm Cấp Độ"/>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black">
                        Create Level Form
                    </h3>
                </div>
                <form method="post" onSubmit={handleSubmit} className="p-6.5">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tên</label>
                        <input
                            className="w-full border border-gray-300 p-2 rounded"
                            type="text"
                            name="levelName"
                            value={formValues.levelName}
                            onChange={handleChange}
                            placeholder="Nhập tên level"
                            required
                        />
                        {errors.levelName && <p className="text-red-500 text-sm">{errors.levelName}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Tạo
                    </button>
                </form>
            </div>
        </>
    );
}
