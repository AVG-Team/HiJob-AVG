import PropTypes from "prop-types";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function JobFollowCard(props) {
    const { job } = props;

    JobFollowCard.propTypes = {
        job: PropTypes.object.isRequired,
    };
    JobFollowCard.propTypes = {
        job: PropTypes.shape({
            companyLogo: PropTypes.string.isRequired,
            companyName: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            salaryInfo: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            skills: PropTypes.arrayOf(PropTypes.string).isRequired,
            to: PropTypes.string.isRequired,
        }).isRequired,
    };
    return (
        <a
            href={job.to}
            className="h-64 p-5 bg-white rounded-lg shadow-lg md:h-auto hover:bg-slate-100 hover:shadow-xl"
        >
            <div className="flex items-center justify-between mb-2">
                <img src={job.companyLogo} alt={`${job.companyName} Logo`} className="w-12 h-12 mr-4" />
                <button>
                    <BookmarkIcon className="text-primary hover:text-primary-600 hover:shadow-lg" />
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
        </a>
    );
}
