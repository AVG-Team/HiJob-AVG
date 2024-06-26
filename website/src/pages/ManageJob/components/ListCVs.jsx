export default function ListCVs() {
    return (
        <div className="p-6 mx-auto mt-10 bg-white rounded-lg shadow-md ">
            <h2 className="mb-4 text-2xl font-semibold">CV Chính Của Bạn</h2>
            <p className="mb-4 text-gray-700">
                Chọn một sơ yếu lý lịch để làm CV chính mà bạn trình bày với nhà tuyển dụng tiềm năng khi bật trạng thái
            </p>
            <div className="mb-4 bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                    <label className="flex items-center">
                        <input type="radio" name="cv" className="mr-2 text-indigo-600 form-radio" />
                        <div className="flex flex-col">
                            <span className="font-medium">
                                TopDev CV <span className="font-semibold text-green-600">Standard</span>
                            </span>
                            <span className="text-sm text-gray-500">Cập nhật lần cuối lúc 03:03 07/06/2024</span>
                        </div>
                    </label>
                </div>
                <div className="p-4 border-b bg-red-50">
                    <label className="flex items-center">
                        <input type="radio" name="cv" className="mr-2 text-indigo-600 form-radio" defaultChecked />
                        <div className="flex flex-col">
                            <span className="font-medium">CV_Nguyen_Mai_Bao_Huy_Java_Internship.pdf</span>
                            <span className="text-sm text-gray-500">Cập nhật lần cuối lúc 03:02 07/06/2024</span>
                        </div>
                    </label>
                </div>
                <div className="p-4 border-b">
                    <label className="flex items-center">
                        <input type="radio" name="cv" className="mr-2 text-indigo-600 form-radio" />
                        <div className="flex flex-col">
                            <span className="font-medium">CV_Nguyen_Mai_Bao_Huy.pdf</span>
                            <span className="text-sm text-gray-500">Cập nhật lần cuối lúc 16:26 04/06/2024</span>
                        </div>
                    </label>
                </div>
                <div className="p-4">
                    <label className="flex items-center">
                        <input type="radio" name="cv" className="mr-2 text-indigo-600 form-radio" />
                        <div className="flex flex-col">
                            <span className="font-medium">CV_Nguyen_Mai_Bao_Huy.pdf</span>
                            <span className="text-sm text-gray-500">Cập nhật lần cuối lúc 16:21 25/03/2024</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}
