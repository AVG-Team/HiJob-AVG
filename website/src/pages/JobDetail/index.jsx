import { useEffect } from "react";
import PropTypes from "prop-types";
import CompanyInfo from "./components/CompanyInfo";
import Detail from "./components/Detail";
import AboutComp from "./components/AboutComp";
import AboutJob from "./components/AboutJob";

export default function JobDetail(props) {
    const { title } = props;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);
    JobDetail.propTypes = {
        title: PropTypes.string,
    };
    return (
        <main className="flex items-center justify-center bg-primary-50">
            <div className="w-full lg:px-20">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="py-2 lg:col-span-2">
                        <CompanyInfo />
                        <Detail />
                        <AboutComp />
                    </div>
                    <div className="py-2 mb-5 lg:col-span-1">
                        <div className="w-full mt-2">
                            <button className="w-full py-6 font-bold text-white rounded-xl bg-secondary hover:bg-secondary-400 hover:shadow-lg">
                                Ứng tuyển ngay
                            </button>
                        </div>
                        <AboutJob />
                    </div>
                </div>
            </div>
        </main>
    );
}
