import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import skillApi from '../../../../services/apis/skillApi';
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb.jsx";

export default function CreateSkillForm() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        skillName: ''
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

        if (formValues.skillName.trim() === '') {
            validationErrors.skillName = 'Name is required';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            await skillApi.createSkill(formValues);
            toast.success('Thêm kỹ năng thành công');
            navigate('/admin/skills');
        } catch (error) {
            console.error('Error creating skill:', error);
            toast.error('Thêm kỹ năng thất bại');
        }
    };

    return (
        <>
            <div>
                <Breadcrumb pageName="Thêm Kỹ Năng"/>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black">
                        Create Skill Form
                    </h3>
                </div>
                <form method="post" onSubmit={handleSubmit} className="p-6.5">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tên</label>
                        <input
                            className="w-full border border-gray-300 p-2 rounded"
                            type="text"
                            name="skillName"
                            value={formValues.skillName}
                            onChange={handleChange}
                            placeholder="Enter skill name"
                            required
                        />
                        {errors.skillName && <p className="text-red-500 text-sm">{errors.skillName}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Tạo
                    </button>
                </form>
            </div>
        </>
    );
}
