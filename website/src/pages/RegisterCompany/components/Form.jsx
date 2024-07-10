import { useState } from "react";
import { toast } from "react-toastify";
import jobApi from "../../../services/apis/jobApi";
import { provinces } from "../../../mocks/data.js";
import companyApi from "../../../services/apis/companyApi";
import { profile, getUser } from "../../../services/apis/profile.js";

export default function Form() {
    const [selectedProvince, setSelectedProvince] = useState();

    const handleChangeProvince = (event) => {
        const value = event.target.value || "";
        setSelectedProvince(value);
        setFormData({
            ...formData,
            province: value,
        });
    };
    const [formData, setFormData] = useState({
        name: "",
        taxCode: "",
        field: "",
        address: "",
        province: "",
        registration_certificate: "",
        about: "",
        linkGoogleMap: "",
        employee_id: "",
        logo: "",
        banner: "",
        benefits: "",
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const profileUser = await profile();
            console.log("Profile user:", profileUser);
            const user = await getUser(profileUser.data.email);
            console.log("User:", user.data.id);
            const company = await companyApi.getCompanyByUserId(user.data.id);
            console.log("Company:", company.data.id);

            const dataJob = {
                title: formData.title,
                description: formData.description,
                responsibilities: formData.responsibility,
                requirements: formData.requirement,
                benefits: formData.benefits,
                requireOfYear: formData.requireOfYear,
                salary: parseInt(formData.salary, 10) || 0,
                companyId: company.data.id,
                userId: user.data.id,
            };
            const response = await jobApi.createJob(dataJob);

            toast.success("Ứng tuyển thành công");
            console.log("Job application response:", response.data);
        } catch (error) {
            console.error("Error submitting job application:", error);
            toast.error("Đã xảy ra lỗi khi ứng tuyển");
        }
    };

    return (
        <div className="w-full bg-white rounded-lg shadow-lg ">
            <div className="flex items-center justify-center p-4 border-b">
                <h5 className="text-xl font-bold">Đăng Ký Công Ty</h5>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                            Tên Công Ty
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            placeholder="AVG Team"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                                Về chúng tôi
                            </label>
                            <textarea
                                id="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="responsibility">
                                Lợi ích
                            </label>
                            <textarea
                                id="responsibility"
                                rows="5"
                                value={formData.responsibility}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="field">
                                Lĩnh Vực
                            </label>
                            <input
                                type="text"
                                id="field"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                placeholder="Công nghệ"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="province">
                                Tỉnh thành
                            </label>
                            <select
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                name="province"
                                label="Tỉnh thành"
                                value={selectedProvince}
                                onChange={handleChangeProvince}
                            >
                                <option value="">Chọn tỉnh thành</option>
                                {provinces.map((province) => (
                                    <option key={province.idProvince} value={province.name}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="field">
                                Địa chỉ
                            </label>
                            <input
                                type="text"
                                id="field"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                placeholder="Công viên phần mềm quang trung"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="linkGoogleMap">
                                Link map
                            </label>
                            <input
                                type="text"
                                id="linkGoogleMap"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                placeholder="https://goo.gl/maps/1"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="taxCode">
                                Mã số thuế
                            </label>
                            <input
                                type="text"
                                id="taxCode"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                placeholder="1212323234"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="col-span-1">
                            <label
                                className="block text-sm font-medium text-gray-700"
                                htmlFor="registrationCertificate"
                            >
                                Giấy phép
                            </label>
                            <input
                                type="file"
                                id="registrationCertificate"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="logo">
                                Logo
                            </label>
                            <input
                                type="file"
                                id="logo"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="banner">
                                Banner
                            </label>
                            <input
                                type="file"
                                id="banner"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end col-span-1">
                        <button
                            type="submit"
                            className="py-3 font-bold text-white uppercase rounded-lg shadow-lg px-9 bg-primary lg:mx-0 hover:bg-primary-700 hover:shadow-lg"
                        >
                            Gửi thông tin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
