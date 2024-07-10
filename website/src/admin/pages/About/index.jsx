import React, {useEffect} from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.jsx";
import CustomInput from "../../../components/Forms/Inputs/customColor.jsx";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {provinces} from "../../../mocks/data.js";
import {CertificateUrl} from "../../../services/key/url.js";
import {CustomLoadingButton} from "../../../components/Forms/Button/customColor.jsx";
import {about, saveAbout} from "../../../services/apis/admin/about.js";
import {toast} from "react-toastify";

export default function About(props) {
    const [formData, setFormData] = React.useState({
        address: "",
        description: "",
        email: "",
        iframeGoogleMap: "",
        nameCompany: "",
        phone: "",
        website: "",
        title: "",
    });
    const [errors, setErrors] = React.useState({});
    const [errorString, setErrorString] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [loadData, setLoadData] = React.useState(false);

    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
        getAbout().then();
    }, [title]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            console.log(formData)
            const response = await saveAbout(formData);
            const data = response.data;
            toast.success("Lưu Thông Tin Thành Công");
        } catch (error) {
            console.error(error);
            toast.error("Lưu Thông Tin Thất Bại");
            setErrorString("Lưu Thông Tin Thất Bại");
        } finally {
            setLoading(false);
        }
    }

    const getAbout = async () => {
        try {
            const response = await about();
            const data = response.data;
            setFormData({
                address: data?.address || "",
                description: data?.description || "",
                email: data?.email || "",
                iframeGoogleMap: data?.iframeGoogleMap || "",
                nameCompany: data?.nameCompany || "",
                phone: data?.phone || "",
                website: data?.website || "",
                title: data?.title || "",
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoadData(true);
        }
    }
    return (
        <>
            <div>
                <Breadcrumb pageName="Sửa Thông Tin Trang Website"/>
            </div>

            <div className="rounded-sm border border-stroke bg-white shadow-default">
                <div className="border-b border-stroke py-4 px-6.5 ">
                    <h3 className="font-medium text-black">
                        Biểu Mẫu Thông Tin
                    </h3>
                </div>
                {loadData && (
                    <form method="post" onSubmit={handleSubmit} className="p-6.5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Địa Chỉ</label>
                            <CustomInput
                                error={!!errors.address}
                                className="w-full"
                                type="text"
                                autoComplete="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Nhập Địa Chỉ"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Mô Tả Trang Website</label>
                            <textarea rows="4" cols="50"
                                      className="w-full p-3 border border-stroke rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                      autoComplete="description"
                                      name="description"
                                      onChange={handleChange}
                                      placeholder="Nhập Mô Tả Trang Website"
                                      defaultValue={formData.description}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Email</label>
                            <CustomInput
                                error={!!errors.email}
                                className="w-full"
                                type="text"
                                autoComplete="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Iframe Google Map</label>
                            <CustomInput
                                error={!!errors.iframeGoogleMap}
                                className="w-full"
                                type="text"
                                autoComplete="iframeGoogleMap"
                                name="iframeGoogleMap"
                                value={formData.iframeGoogleMap}
                                onChange={handleChange}
                                placeholder="Nhập Iframe Google Map"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Tên Trang Website</label>
                            <CustomInput
                                error={!!errors.title}
                                className="w-full"
                                type="text"
                                autoComplete="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Nhập Tên Trang Website"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Tên Công Ty</label>
                            <CustomInput
                                error={!!errors.nameCompany}
                                className="w-full"
                                type="text"
                                autoComplete="nameCompany"
                                name="nameCompany"
                                value={formData.nameCompany}
                                onChange={handleChange}
                                placeholder="Nhập Tên Công Ty"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Số Điện Thoại</label>
                            <CustomInput
                                error={!!errors.phone}
                                className="w-full"
                                type="text"
                                autoComplete="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập Số Điện Thoại"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Website</label>
                            <CustomInput
                                error={!!errors.website}
                                className="w-full"
                                type="text"
                                autoComplete="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="Nhập Website"
                            />
                        </div>
                        <CustomLoadingButton variant="contained" type="submit" className="w-full" loading={loading}>
                            Lưu Thông Tin Website
                        </CustomLoadingButton>
                        <div className="mt-2">
                            <div
                                className={`bg-red-100 text-red-500 p-4 ${errorString.length !== 0 ? "" : "hidden"}`}
                                role="alert">
                                {errorString}
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}