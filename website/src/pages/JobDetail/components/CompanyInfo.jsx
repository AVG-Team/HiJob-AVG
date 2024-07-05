import { useState } from "react";
import Lottie from "lottie-react";
import PropTypes from "prop-types";
import Assignment from "../../../assets/img/assignment.json";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function CompanyInfo({ job, company }) {
    const [iconFollow, setIconFollow] = useState(false);

    const handleChangeFollow = () => {
        setIconFollow((prevState) => !prevState);
    };
    CompanyInfo.propTypes = {
        job: PropTypes.object.isRequired,
        company: PropTypes.object.isRequired,
    };
    return (
        <div className="flex items-center justify-center w-full pb-3 mt-2 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl p-6 overflow-hidden bg-white rounded shadow-lg lg:rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="p-2 bg-white rounded-full">
                            <Lottie animationData={Assignment} className="w-12 sm:w-20" />
                        </div>
                        <div className="ml-4 leading-8">
                            <h2 className="text-lg font-bold sm:text-xl">{job.title}</h2>
                            <p className="mt-2 mb-1 text-sm text-gray-500">{company.name}</p>
                            <div className="flex items-center">
                                <LocationOnIcon fontSize="small" className="text-gray-200" />
                                <p className="ml-1 text-sm sm:text-md">{company.address}</p>
                            </div>
                            <div className="flex items-center mt-2">
                                <PaymentsIcon fontSize="small" className="text-gray-200" />
                                <p className="ml-1 text-sm font-bold sm:text-md text-secondary">
                                    Đăng nhập để xem mức lương
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleChangeFollow}
                        className="p-2 mb-20 ml-4 text-3xl font-semibold rounded-lg text-primary lg:text-6xl opacity-80 hover:text-primary-600 hover:shadow-lg"
                    >
                        {iconFollow ? <BookmarkIcon fontSize="large" /> : <BookmarkBorderIcon fontSize="large" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
