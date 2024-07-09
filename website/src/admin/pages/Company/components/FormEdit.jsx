import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import companyApi  from "../../../../services/apis/companyApi.js";

export default function EditCompanyForm () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [formValues, setFormValues] = useState({
        name: '',
        taxCode: '',
        field: '',
        address: '',
        province: '',
        registration_certificate: '',
        linkGoogleMap: '',
        about: '',
    });
    const [errors, setErrors] = useState({});
    const [birthdate, setBirthdate] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await companyApi.getCompanyById(id);
                setCompany(response.data);
                setFormValues({
                    name: response.data.name || '',
                    taxCode: response.data.taxCode || '',
                    field: response.data.field || '',
                    address: response.data.address || '',
                    province: response.data.province || '',
                    registration_certificate: response.data.registration_certificate || '',
                    linkGoogleMap: response.data.linkGoogleMap || '',
                    about: response.data.about || '',
                });
                setBirthdate(response.data.birthday ? dayjs(response.data.birthday) : null);
            } catch (error) {
                console.error('Error fetching company:', error);
                toast.error('Failed to fetch company data');
            }
        };

        fetchCompany();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleDateChange = (e) => {
        setBirthdate(e.target.value);
        setFormValues({
            ...formValues,
            birthday: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form here
        const validationErrors = {};

        if (formValues.name.trim() === '') {
            validationErrors.name = 'Name is required';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        if (birthdate) {
            formValues.birthday = birthdate.format("YYYY-MM-DD");
        }

        try {
            await companyApi.updateCompany(id, formValues);
            toast.success('Company updated successfully');
            navigate('/admin/companies');
        } catch (error) {
            console.error('Error updating company:', error);
            toast.error('Failed to update company');
        }
    };

    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Name</label>
                <input
                    className="w-full border border-gray-300 p-2 rounded"
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    required
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Tax Code</label>
                <input
                    className="w-full border border-gray-300 p-2 rounded"
                    type="text"
                    name="taxCode"
                    value={formValues.taxCode}
                    onChange={handleChange}
                    placeholder="Enter tax code"
                    required
                />
                {errors.taxCode && <p className="text-red-500 text-sm">{errors.taxCode}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Field</label>
                <input
                    className="w-full border border-gray-300 p-2 rounded"
                    type="text"
                    name="field"
                    value={formValues.field}
                    onChange={handleChange}
                    placeholder="Enter field"
                    required
                />
                {errors.field && <p className="text-red-500 text-sm">{errors.field}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Address</label>
                <input
                    className="w-full border border-gray-300 p-2 rounded"
                    type="text"
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    required
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Province</label>
                <input
                    className="w-full border border-gray-300 p-2 rounded"
                    type="text"
                    name="province"
                    value={formValues.province}
                    onChange={handleChange}
                    placeholder="Enter province"
                    required
                />
                {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Registration Certificate</label>
                <input
                    className="w-full border border-gray-300 p-2 rounded"
                    type="text"
                    name="registration_certificate"
                    value={formValues.registration_certificate}
                    onChange={handleChange}
                    placeholder="Enter registration certificate"
                    required
                />
                {errors.registration_certificate && <p className="text-red-500 text-sm">{errors.registration_certificate}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Google Map Link</label>
                <input
                    className="w-full border border-gray-300 p-2 rounded"
                    type="text"
                    name="linkGoogleMap"
                    value={formValues.linkGoogleMap}
                    onChange={handleChange}
                    placeholder="Enter Google Map link"
                    required
                />
                {errors.linkGoogleMap && <p className="text-red-500 text-sm">{errors.linkGoogleMap}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">About</label>
                <textarea
                    className="w-full border border-gray-300 p-2 rounded"
                    name="about"
                    value={formValues.about}
                    onChange={handleChange}
                    placeholder="Enter about"
                    required
                />
                {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Save Changes
            </button>
        </form>
    );
};