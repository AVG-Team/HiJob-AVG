import Slider from "react-slick";
import PropTypes from "prop-types";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const JobCard = ({ job }) => {
    return (
        <div className="h-64 p-5 bg-white rounded-lg shadow-lg md:h-auto">
            <div className="flex items-center justify-between mb-2">
                <img src={job.companyLogo} alt={`${job.companyName} Logo`} className="w-12 h-12 mr-4" />
                <button>
                    <BookmarkBorderIcon className="text-primary hover:text-primary-600 hover:shadow-lg" />
                </button>
            </div>
            <div className="justify-start flex-1 leading-tight">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.companyName}</p>
                <p className="mt-2 text-secondary">{job.salaryInfo}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
            </div>
            <div className="flex flex-wrap mt-2 space-x-2">
                {job.skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-2 py-1 mt-1 text-sm text-white rounded-md bg-primary hover:bg-primary-600 hover:shadow-lg"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

JobCard.propTypes = {
    job: PropTypes.shape({
        companyLogo: PropTypes.string.isRequired,
        companyName: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        salaryInfo: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

const jobs = [
    {
        title: "Fresher/Junior - Senior C++ Developer",
        companyName: "DTS Software Viet Nam",
        companyLogo: "https://via.placeholder.com/48", // Replace with actual logo URL
        salaryInfo: "Đăng nhập để xem mức lương",
        location: "Quận Ba Đình, Hà Nội",
        skills: ["C++", "C#", "CAD"],
    },
    {
        title: "Fresher/Junior - Senior Java Developer",
        companyName: "DTS Software Viet Nam",
        companyLogo: "https://via.placeholder.com/48", // Replace with actual logo URL
        salaryInfo: "Đăng nhập để xem mức lương",
        location: "Quận Ba Đình, Hà Nội",
        skills: ["C++", "C#", "CAD"],
    },
    {
        title: "Fresher/Junior - Senior Reactjs Developer",
        companyName: "DTS Software Viet Nam",
        companyLogo: "https://via.placeholder.com/48", // Replace with actual logo URL
        salaryInfo: "Đăng nhập để xem mức lương",
        location: "Quận Ba Đình, Hà Nội",
        skills: ["C++", "C#", "CAD"],
    },
    {
        title: "Fresher/Junior - Senior Software Developer",
        companyName: "DTS Software Viet Nam",
        companyLogo: "https://via.placeholder.com/48", // Replace with actual logo URL
        salaryInfo: "Đăng nhập để xem mức lương",
        location: "Quận Ba Đình, Hà Nội",
        skills: ["C++", "C#", "CAD"],
    },
];

export default function FeaturedJobToday() {
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
                        <Slider {...settings}>
                            {jobs.map((job) => (
                                <div key={job.title} className="p-3 md:p-5">
                                    <JobCard job={job} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}
