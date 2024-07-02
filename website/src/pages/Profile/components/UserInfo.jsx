const UserInfo = () => {
    return (
        <div className="flex items-center justify-center w-full pb-3 mt-2 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl p-6 bg-white rounded shadow-lg">
                <div className="flex items-center">
                    <img
                        className="w-40 h-40 rounded-full sm:w-auto sm:h-auto lg:w-40 lg:h-40 lg:mr-5"
                        src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
                        alt="Avatar"
                    />
                    <div className="leading-8">
                        <h2 className="text-lg font-bold sm:text-xl">8771_Trần Gia Bảo</h2>
                        <div className="flex flex-col sm:flex-row sm:items-center mt-2">
                            <p className="text-sm text-gray-500 sm:mr-4">Thêm vị trí công việc</p>
                            <p className="text-sm text-gray-500">Thêm số năm kinh nghiệm</p>
                        </div>
                        <div className="flex flex-wrap mt-2">
                            <p className="text-sm text-gray-500 sm:mr-4">Thêm địa điểm</p>
                            <p className="text-sm text-gray-500 sm:mr-4">tgbao2306@gmail.com</p>
                            <p className="text-sm text-gray-500 sm:mr-4">Thêm số điện thoại</p>
                            <p className="text-sm text-gray-500">Thêm liên kết mạng xã hội</p>
                        </div>
                        <div className="flex mt-4">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                type="button"
                            >
                                Nhập nhanh hồ sơ
                            </button>
                            <button
                                className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                type="button"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
