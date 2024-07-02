import { useState } from "react";

export default function Form() {
    const [tab, setTab] = useState(0);

    const handleTab = (index) => {
        setTab(index);
    };

    return (
        <div className="container flex items-center justify-center mx-auto mt-2 px-28">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col items-center mb-6">
                    <div className="flex justify-start w-full border-b border-gray-200">
                        <button
                            onClick={() => handleTab(0)}
                            className={`px-4 py-2 rounded-t-lg ${
                                tab === 0 ? "text-white bg-secondary" : "text-gray-600"
                            }`}
                        >
                            Chỗ Ở Qua Đêm
                        </button>
                        <button
                            onClick={() => handleTab(1)}
                            className={`px-4 py-2 rounded-t-lg ${
                                tab === 1 ? "text-white bg-secondary" : "text-gray-600"
                            }`}
                        >
                            Chỗ Ở Trong Ngày
                        </button>
                    </div>
                </div>
                {tab === 0 && (
                    <form className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="flex-grow mb-4 sm:mb-0">
                                <label htmlFor="destination" className="block mb-2 text-gray-700">
                                    Nhập điểm du lịch hoặc tên khách sạn
                                </label>
                                <input
                                    type="text"
                                    id="destination"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Nhập điểm du lịch hoặc tên khách sạn"
                                ></input>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="flex-grow mb-4 sm:mb-0">
                                <label htmlFor="checkin" className="block mb-2 text-gray-700">
                                    Ngày nhận phòng
                                </label>
                                <input
                                    type="date"
                                    id="checkin"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                ></input>
                            </div>
                            <div className="flex-grow mb-4 sm:mb-0">
                                <label htmlFor="checkout" className="block mb-2 text-gray-700">
                                    Ngày trả phòng
                                </label>
                                <input
                                    type="date"
                                    id="checkout"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                ></input>
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="guests" className="block mb-2 text-gray-700">
                                    Số lượng khách
                                </label>
                                <select id="guests" className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option value="1">1 người lớn</option>
                                    <option value="2">2 người lớn</option>
                                    <option value="3">3 người lớn</option>
                                    <option value="4">4 người lớn</option>
                                    <option value="5">5 người lớn</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-10 py-2 font-bold text-white duration-300 ease-in-out rounded-lg bg-primary hover:scale-105"
                            >
                                Tìm
                            </button>
                        </div>
                    </form>
                )}
                {tab === 1 && (
                    <form className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="flex-grow mb-4 sm:mb-0">
                                <label htmlFor="destination-day" className="block mb-2 text-gray-700">
                                    Nhập điểm du lịch hoặc tên khách sạn (Trong Ngày)
                                </label>
                                <input
                                    type="text"
                                    id="destination-day"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Nhập điểm du lịch hoặc tên khách sạn"
                                ></input>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="flex-grow mb-4 sm:mb-0">
                                <label htmlFor="checkin-day" className="block mb-2 text-gray-700">
                                    Ngày sử dụng
                                </label>
                                <input
                                    type="date"
                                    id="checkin-day"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                ></input>
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="guests-day" className="block mb-2 text-gray-700">
                                    Số lượng khách
                                </label>
                                <select id="guests-day" className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option value="1">1 người lớn</option>
                                    <option value="2">2 người lớn</option>
                                    <option value="3">3 người lớn</option>
                                    <option value="4">4 người lớn</option>
                                    <option value="5">5 người lớn</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-10 py-2 font-bold text-white duration-300 ease-in-out rounded-lg bg-primary hover:scale-105"
                            >
                                Tìm
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
