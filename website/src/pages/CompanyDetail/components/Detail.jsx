import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import jobFollowApi from "../../../services/apis/jobFollowApi"; // Import the API for following jobs
import { profile, getUser } from "../../../services/apis/profile";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

Detail.propTypes = {
    company: PropTypes.object,
    jobs: PropTypes.array,
};

export default function Detail({ company, jobs }) {
    const [tab, setTab] = useState(0);
    const [followStatus, setFollowStatus] = useState({});
    const [userInfo, setUserInfo] = useState({});

    const handleTab = (index) => {
        setTab(index);
    };

    const handleChangeFollow = async (jobId) => {
        try {
            const responseProfile = await profile();
            const responseUser = await getUser(responseProfile.data.email);
            setUserInfo(responseUser.data);

            if (!followStatus[jobId]) {
                await jobFollowApi.createJobFollow(userInfo.id, jobId);
                console.log("Job followed successfully");
            } else {
                await jobFollowApi.deleteJobFollow(userInfo.id, jobId);
                console.log("Job unfollowed successfully");
            }
            setFollowStatus((prevState) => ({
                ...prevState,
                [jobId]: !prevState[jobId],
            }));
        } catch (error) {
            console.log("Failed to change job follow status: ", error);
        }
    };

    useEffect(() => {
        const fetchJobFollowStatus = async () => {
            try {
                const userId = userInfo.id;
                const followStatus = {};

                for (let job of jobs) {
                    const response = await jobFollowApi.getJobFollowByUserIdAndJobId(userId, job.id);
                    followStatus[job.id] = !!response.data;
                }

                setFollowStatus(followStatus);
                console.log("Fetched job follow status successfully");
            } catch (error) {
                console.log("Failed to fetch job follow status: ", error);
            }
        };

        if (userInfo.id) {
            fetchJobFollowStatus();
        }
    }, [jobs, userInfo.id]);

    return (
        <div className="flex items-center justify-center mt-5 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl p-6 bg-white rounded shadow-lg lg:rounded-lg">
                <div className="flex flex-col items-center mb-6">
                    <div className="flex justify-start w-full border-b border-gray-200">
                        <button
                            onClick={() => handleTab(0)}
                            className={`px-4 py-2 rounded-t-lg font-semibold ${
                                tab === 0 ? "text-white bg-secondary" : "text-gray-600"
                            }`}
                        >
                            Thông tin công ty
                        </button>
                        <button
                            onClick={() => handleTab(1)}
                            className={`px-4 py-2 rounded-t-lg font-semibold ${
                                tab === 1 ? "text-white bg-secondary" : "text-gray-600"
                            }`}
                        >
                            Vị trí tuyển dụng
                        </button>
                    </div>
                </div>
                {tab === 0 && (
                    <div className="w-full mx-auto space-y-6 text-gray-600">
                        <div className="flex-1">
                            <div className="flex-1 pt-2 pb-3 border-b">
                                <h2 className="mb-4 text-lg font-bold sm:text-xl">Về chúng tôi</h2>
                                <ul className="list-none list-inside">
                                    <li className="mb-2 ml-5 text-sm lg:text-md">{company.about}</li>
                                </ul>
                            </div>
                            <div className="flex-1 pt-2 pb-3 border-b">
                                <h2 className="mb-4 text-lg font-bold sm:text-xl">Phúc lợi cho bạn</h2>
                                <ul className="list-disc list-inside">
                                    <li className="mb-2 ml-5 text-sm lg:text-md">{company.benefit}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
                {tab === 1 && (
                    <div className="w-full mx-auto space-y-6 text-gray-600 bg-slate-50">
                        {Array.isArray(jobs) && jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div
                                    key={job.id}
                                    className="h-64 p-5 bg-white rounded-lg shadow-lg md:h-auto hover:shadow-xl hover:bg-slate-200"
                                >
                                    <Link to={`/viec-lam/${job.id}`} className="block w-full h-1/2">
                                        <div className="flex items-center justify-between mb-2">
                                            <img src={company.logoUrl} alt="" className="w-12 h-12 mr-4" />
                                            <button onClick={() => handleChangeFollow(job.id)} className="">
                                                {followStatus[job.id] ? (
                                                    <BookmarkIcon className="text-primary hover:text-primary-600 hover:shadow-lg" />
                                                ) : (
                                                    <BookmarkBorderIcon className="text-primary hover:text-primary-600 hover:shadow-lg" />
                                                )}
                                            </button>
                                        </div>
                                        <div className="justify-start flex-1 leading-tight">
                                            <p className="text-sm text-gray-600">{company.name}</p>
                                            <h3 className="text-lg font-bold">{job.title}</h3>
                                            <p className="mt-2 text-secondary">{job.salary} VND</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No job positions available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
