import { useEffect } from "react";
import PropTypes from "prop-types";
import TabForm from "../../components/TabForm";
import TableForm from "./components/TableForm";
export default function ManageCV(props) {
    const { title } = props;
    useEffect(() => {
        document.title = title ? `${title}` : "Không tìm thấy trang";
    }, [title]);

    ManageCV.propTypes = {
        title: PropTypes.string,
    };

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="container px-4 py-5 mx-auto lg:px-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full">
                        <TabForm id={3} />
                        <div className="flex justify-between py-4 items-cente text-primary">
                            <div className="flex items-center justify-between">
                                <h1 className="text-lg font-bold text-start">Quản lý CV</h1>
                            </div>
                            <button className="px-4 py-3 mx-auto mt-4 ml-auto mr-2 font-bold border rounded-md shadow text-primary border-primary lg:mx-2 opacity-80 hover:text-primary lg:mt-0 hover:bg-slate-50 hover:shadow-lg">
                                Tải CV Lên
                            </button>
                        </div>
                        <TableForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
