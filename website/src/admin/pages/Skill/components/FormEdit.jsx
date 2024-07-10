import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import skillApi from '../../../../services/apis/skillApi';
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb.jsx";

export default function EditSkillForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [skill, setSkill] = useState(null);
    const [formValues, setFormValues] = useState({
        skillName: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const response = await skillApi.getSkillById(id);
                setSkill(response.data);
                setFormValues({
                    skillName: response.data.skillName || ''
                });
            } catch (error) {
                console.error('Error fetching skill:', error);
                toast.error('Failed to fetch skill data');
            }
        };

        fetchSkill();
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

        if (formValues.skillName.trim() === '') {
            validationErrors.skillName = 'Name is required';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            await skillApi.updateSkill(id, formValues);
            toast.success('Skill updated successfully');
            navigate('/admin/skills');
        } catch (error) {
            console.error('Error updating skill:', error);
            toast.error('Failed to update skill');
        }
    };

    if (!skill) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <Breadcrumb pageName="Sửa Công Ty"/>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black">
                        Skill Form
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
                        Lưu
                    </button>
                </form>
            </div>
        </>
    );
};
