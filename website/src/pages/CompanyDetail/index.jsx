import { useEffect } from "react";
import PropTypes from "prop-types";
import CompanyInfo from "./components/CompanyInfo.jsx";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Assignment from "../../assets/img/assignment.json";
import AboutComp from "./components/AboutComp.jsx";
import Detail from "./components/Detail.jsx";
import Contact from "./components/Contact.jsx";



export default function CompanyDetail(props) {
    const { title } = props;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);
    CompanyDetail.propTypes = {
        title: PropTypes.string,
    };
    return (
        <main className="flex items-center justify-center bg-primary-50 main-content">
            <div className="w-full lg:px-20">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="py-2 lg:col-span-2">
                        <CompanyInfo />
                        <Detail />
                    </div>
                    <div className="py-2 mb-5 lg:col-span-1">
                        <div className="w-full mt-2">
                            <button className="w-full py-6 font-bold text-white rounded-xl bg-secondary hover:bg-secondary-400 hover:shadow-lg">
                                <BookmarkBorderIcon animationData={Assignment} className="w-12 sm:w-20 mr-4" />
                                Theo dõi
                            </button>
                        </div>
                        <AboutComp />
                        <Contact />
                    </div>
                </div>
            </div>
        </main>
    );
}
