import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import levelApi from '../../../../services/apis/levelApi';
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb.jsx";

export default function EditLevelForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [level, setLevel] = useState(null);
    const [formValues, setFormValues] = useState({
        levelName: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchLevel = async () => {
            try {
                const response = await levelApi.getLevelById(id);
                setLevel(response.data);
                setFormValues({
                    levelName: response.data.levelName || ''
                });
            } catch (error) {
                console.error('Error fetching level:', error);
                toast.error('Failed to fetch level data');
            }
        };

        fetchLevel();
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

        if (formValues.levelName.trim() === '') {
            validationErrors.levelName = 'Name is required';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            await levelApi.updateLevel(id, formValues);
            toast.success('Level updated successfully');
            navigate('/admin/levels');
        } catch (error) {
            console.error('Error updating level:', error);
            toast.error('Failed to update level');
        }
    };

    if (!level) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <Breadcrumb pageName="Sửa Cấp Độ"/>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black">
                        Level Form
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
                        Lưu
                    </button>
                </form>
            </div>
        </>
    );
};
