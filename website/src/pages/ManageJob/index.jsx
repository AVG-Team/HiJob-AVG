import { useEffect } from "react";
import PropTypes from "prop-types";
export default function ManageJob(props) {
    const { title } = props;
    useEffect(() => {
        document.title = title ? `${title}` : "Không tìm thấy trang";
    }, [title]);

    ManageJob.propTypes = {
        title: PropTypes.string,
    };
    return (
        <main className="min-h-screen bg-gray-100">
            <div className="flex items-center justify-center px-4 py-5 mx-auto lg:px-8">
                <div className="container px-10">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div className="col-span-1"></div>
                        <div className="col-span-2">
                            <div className="flex items-center justify-between p-2 text-white rounded-md bg-primary">
                                <p className="pl-2 font-medium text-md">Bạn muốn ẩn hồ sơ với một số nhà tuyển dụng?</p>
                                <button className="px-4 py-1 mx-auto mt-4 ml-auto mr-2 font-bold bg-gray-300 border rounded-md shadow text-primary lg:mx-2 opacity-80 hover:text-primary lg:mt-0 hover:bg-slate-50 hover:shadow-lg">
                                    Tải CV Lên
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
