import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserInfo from "./components/UserInfo.jsx";

export default function Profile(props) {
    const { title } = props;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);
    Profile.propTypes = {
        title: PropTypes.string,
    };

    const [formData, setFormData] = useState({
        fullname: '',
        jobposition: '',
        yearexperience: '',
        address: '',
        email: '',
        phone: '',
        socialmedia: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <main className="flex items-center justify-center bg-gray-200 main-content">
            <div className="w-full lg:px-20">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="py-2 lg:col-span-2">
                        <UserInfo/>
                        <div className="flex items-center justify-center mt-5 sm:px-6 lg:px-8">
                            <div className="w-full max-w-4xl p-6 bg-white rounded shadow-lg lg:rounded-lg">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Job Position</label>
                                        <input
                                            type="text"
                                            name="jobposition"
                                            value={formData.jobposition}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Year
                                            Experience</label>
                                        <input
                                            type="text"
                                            name="yearexperience"
                                            value={formData.yearexperience}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Social Media</label>
                                        <input
                                            type="text"
                                            name="socialmedia"
                                            value={formData.socialmedia}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="py-4 mb-5 lg:col-span-1">
                        <div className="card-body flex gap-4 bg-white px-6 pb-4 pt-6 md:flex-col rounded-tl-md rounded-tr-md">
                            <h3 className="font-semibold md:text-lg hidden md:block">Sẵn sàng cho những cơ hội mới?</h3>
                            <img
                                alt="banner otw"
                                loading="lazy"
                                width="122"
                                height="119"
                                decoding="async"
                                src="https://c.topdevvn.com/v4/_next/static/media/bannerOTW.580cbf45.svg"
                                className="m-auto h-[87px] w-[94px] md:h-[119px] md:w-[122px]"
                            />
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold md:text-lg block md:hidden">Sẵn sàng cho những cơ hội
                                    mới?</h3>
                                <div className="text-gray-400">
                                    Cho phép nhà tuyển dụng tìm kiếm và xem TopDev CV của bạn
                                </div>
                            </div>
                        </div>
                        <div className="card-title flex justify-center bg-red-200 p-4 rounded-bl-md rounded-br-md"><h2
                            className="md:text-lg font-bold text-red-500">Bật trạng thái Đang tìm việc</h2></div>
                    </div>
                </div>
            </div>
        </main>
    );
}

Profile.propTypes = {
    title: PropTypes.string,
};