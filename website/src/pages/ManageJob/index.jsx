import "./index.module.css";
import { useEffect } from "react";
import PropTypes from "prop-types";
import ListCVs from "./components/ListCVs";
import InfoUser from "./components/InfoUser";
import TabForm from "../../components/TabForm";

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
                    <TabForm id={2} />
                    <div className="grid grid-cols-1 gap-4 mt-10 lg:grid-cols-3">
                        <div className="col-span-1">
                            <InfoUser />
                        </div>
                        <div className="col-span-2">
                            <div className="flex items-center justify-between p-2 text-white rounded-md bg-primary">
                                <p className="pl-2 font-medium text-md">Bạn muốn ẩn hồ sơ với một số nhà tuyển dụng?</p>
                                <button className="px-4 py-1 mx-auto mt-4 ml-auto mr-2 font-bold bg-white border rounded-md shadow text-secondary lg:mx-2 hover:text-primary lg:mt-0 hover:bg-slate-50 hover:shadow-lg">
                                    Tải CV Lên
                                </button>
                            </div>
                            <ListCVs />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
