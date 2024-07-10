import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import PropTypes from "prop-types";
import jobFollowApi from "../../../services/apis/jobFollowApi";
import Assignment from "../../../assets/img/assignment.json";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

CompanyInfo.propTypes = {
    job: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired,
};

export default function CompanyInfo({ job, company, currentUser, isAuth }) {
    const [iconFollow, setIconFollow] = useState();

    const handleChangeFollow = async () => {
        try {
            const jobId = job.id;
            const userId = currentUser.id;

            if (!iconFollow) {
                await jobFollowApi.createJobFollow(userId, jobId);
                console.log("Job followed successfully");
            } else {
                console.log("Unfollowing job...");
                await jobFollowApi.deleteJobFollow(userId, jobId);
                console.log("Job unfollowed successfully");
            }
            setIconFollow((prevState) => !prevState);
        } catch (error) {
            console.log("Failed to change job follow status: ", error);
        }
    };

    useEffect(() => {
        const fetchJobFollowStatus = async () => {
            try {
                const jobId = job.id;
                const userId = currentUser.id;
                const response = await jobFollowApi.getJobFollowByUserIdAndJobId(userId, jobId);
                console.log(job.id, currentUser.id);
                console.log(response);
                if (response.data) {
                    console.log("Job followed");
                    setIconFollow(true);
                } else {
                    setIconFollow(false);
                }

                console.log("Fetched job follow status successfully");
            } catch (error) {
                console.log("Failed to fetch job follow status: ", error);
            }
        };

        if (job.id && currentUser.id) {
            console.log("Fetching job follow status...");
            fetchJobFollowStatus();
        }
    }, [job.id, currentUser.id]);

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
                                {isAuth ? (
                                    <p className="ml-1 text-sm font-bold sm:text-md text-secondary">{job.salary} VND</p>
                                ) : (
                                    <p className="ml-1 text-sm font-bold sm:text-md text-secondary">
                                        Đăng nhập để xem mức lương
                                    </p>
                                )}
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
