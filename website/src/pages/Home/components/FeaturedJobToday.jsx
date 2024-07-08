import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import jobApi from "../../../services/apis/jobApi";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import companyApi from "../../../services/apis/companyApi";
import jobSkillApi from "../../../services/apis/jobSkillApi";
import jobFollowApi from "../../../services/apis/jobFollowApi";
import { profile, getUser } from "../../../services/apis/profile";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const JobCard = ({ job, skills, company, currentUser }) => {
    const [iconFollow, setIconFollow] = useState(false);

    const handleChangeFollow = async () => {
        try {
            const jobId = job.id;
            const userId = currentUser.id;

            if (!iconFollow) {
                await jobFollowApi.createJobFollow(userId, jobId);
                console.log("Job followed successfully");
            } else {
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

                setIconFollow(response.data ? true : false);
                console.log("Fetched job follow status successfully");
            } catch (error) {
                console.log("Failed to fetch job follow status: ", error);
            }
        };

        if (job.id && currentUser.id) {
            fetchJobFollowStatus();
        }
    }, [job.id, currentUser.id]);

    return (
        <div className="h-64 p-5 bg-white rounded-lg shadow-lg md:h-auto hover:shadow-xl hover:bg-slate-200">
            <Link to={`/viec-lam/${job.id}`} className="block w-full h-1/2">
                <div className="flex items-center justify-between mb-2">
                    <img src={company.about} alt="" className="w-12 h-12 mr-4" />
                    <button onClick={handleChangeFollow} className="">
                        {iconFollow ? (
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
                <div className="flex flex-wrap mt-2 space-x-2">
                    {skills.map((skill) => (
                        <span
                            key={skill.id}
                            className="px-2 py-1 mt-1 text-sm text-white rounded-md bg-primary hover:bg-primary-600 hover:shadow-lg"
                        >
                            {skill.name}
                        </span>
                    ))}
                </div>
            </Link>
        </div>
    );
};

JobCard.propTypes = {
    job: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        salary: PropTypes.number.isRequired,
        companyId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
    }).isRequired,
    skills: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    company: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        about: PropTypes.string.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default function FeaturedJobToday() {
    const [jobs, setJobs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [companies, setCompanies] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const params = { createdDate: "2024-05-28 14:59:08.639000" };
                const response = await jobApi.getJobCreateToday(params);
                const jobsData = response.data;
                console.log(jobsData);
                setJobs(jobsData);

                // Fetch skills for each job
                const skillsPromises = jobsData.map((job) => jobSkillApi.getAllSkillsByJobId(job.id));
                const skillsResponses = await Promise.all(skillsPromises);

                const skillsData = skillsResponses.reduce((acc, response, index) => {
                    acc[jobsData[index].id] = response.data || []; // Ensure response.data is defined
                    return acc;
                }, {});

                setSkills(skillsData);

                // Fetch company for each job
                const companyPromises = jobsData.map((job) => companyApi.getCompanyById(job.companyId));
                const companyResponses = await Promise.all(companyPromises);

                const companyData = companyResponses.reduce((acc, response, index) => {
                    acc[jobsData[index].companyId] = response.data; // Ensure response.data is defined
                    return acc;
                }, {});
                setCompanies(companyData);

                const responseProfile = await profile();
                const responseUser = await getUser(responseProfile.data.email);
                setUserInfo(responseUser.data);
            } catch (error) {
                console.error("Error fetching jobs or skills:", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div
            data-aos="fade-right"
            className="w-full px-5 py-20 mx-auto my-20 mt-8 bg-gradient-to-br from-white to-primary-200"
        >
            <div className="flex-1">
                <div className="flex items-center justify-center pb-2 mb-4 text-center">
                    <h1 className="text-3xl font-bold text-center">
                        Công Việc <span className="text-secondary">Hot</span> Hôm Nay
                    </h1>
                </div>
                <div className="flex items-center justify-center px-2 md:px-10">
                    <div className="container">
                        {jobs.length > 0 ? (
                            <Slider {...settings}>
                                {jobs.map((job) => (
                                    <div key={job.id} className="p-3 md:p-5">
                                        <JobCard
                                            job={job}
                                            skills={skills[job.id] || []}
                                            company={companies[job.companyId] || {}}
                                            currentUser={userInfo}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <p>No jobs available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
