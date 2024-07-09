import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import dayjs from 'dayjs';
import companyApi from "../../../../services/apis/companyApi.js";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb.jsx";
import CustomInput from "../../../../components/Forms/Inputs/customColor.jsx";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {provinces} from "../../../../mocks/data.js";
import {CertificateUrl} from "../../../../services/key/url.js";

export default function EditCompanyForm() {
    const {id} = useParams();
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
        employer_name: '',
    });
    const [errors, setErrors] = useState({});
    const [birthdate, setBirthdate] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState('');

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await companyApi.getCompanyById(id);
                console.log('Company:', response.data)
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
                    employer_name: response.data.employer_name || '',
                });
                setSelectedProvince(response.data.province || '')
                setBirthdate(response.data.birthday ? dayjs(response.data.birthday) : null);
            } catch (error) {
                console.error('Error fetching company:', error);
                toast.error('Failed to fetch company data');
            }
        };

        fetchCompany();
    }, [id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
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

    const handleChangeProvince = (event) => {
        const value = event.target.value || '';
        setSelectedProvince(value);
        setFormValues({
            ...formValues,
            province: value
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
        <>
            <div>
                <Breadcrumb pageName="Sửa Công Ty"/>
            </div>

            <div
                className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black">
                        Company Form
                    </h3>
                </div>
                <form method="post" onSubmit={handleSubmit} className="p-6.5">
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
                    <div className="mb-4 md:grid md:grid-cols-3 gap-x-5">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Địa chỉ</label>
                            <CustomInput
                                error={!!errors.address}
                                className="w-full"
                                type="text"
                                autoComplete="address"
                                name="address"
                                value={formValues.address}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-8"> </label>
                            <FormControl fullWidth>
                                <InputLabel id="input-province">Tỉnh thành</InputLabel>
                                <Select
                                    error={!!errors.province}
                                    className="w-full"
                                    name="province"
                                    labelId="input-province"
                                    label="Tỉnh thành"
                                    value={selectedProvince}
                                    onChange={handleChangeProvince}
                                    renderValue={(selected) => {
                                        if (selected === "" || selected === null || selected === undefined) {
                                            return <em style={{opacity: "50%"}}>Chọn tỉnh thành</em>;
                                        }

                                        return selected;
                                    }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Chọn tỉnh thành</em>
                                    </MenuItem>
                                    {provinces.map((province) => (
                                        <MenuItem key={province.idProvince} value={province.name}>
                                            {province.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-mediumy mb-3">Registration Certificate : <a
                            className="text-primary cursor-pointer"
                            href={CertificateUrl + formValues.registration_certificate}>{formValues.registration_certificate}</a></label>
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
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Nhà Tuyển Dụng</label>
                        <input
                            disabled
                            className="w-full border bg-gray-300 border-gray-300 p-2 rounded"
                            type="text"
                            value={formValues.employer_name}
                            placeholder="Enter Google Map link"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    );
};