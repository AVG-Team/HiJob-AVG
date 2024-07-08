import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import TabForm from "../../components/TabForm";
import { useTheme } from "@mui/material/styles";
import jobApi from "../../services/apis/jobApi";
import Pagination from "@mui/material/Pagination";
import JobFollowCard from "./components/JobFollowCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import companyApi from "../../services/apis/companyApi";
import jobSkillApi from "../../services/apis/jobSkillApi";
import jobFollowApi from "../../services/apis/jobFollowApi";
import { profile, getUser } from "../../services/apis/profile";

JobFollowing.propTypes = {
    title: PropTypes.string,
};

export default function JobFollowing(props) {
    const { title } = props;
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up("lg"));

    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const [jobItems, setJobItems] = useState([]);

    useEffect(() => {
        if (isLg) {
            setItemsPerPage(6);
        } else {
            setItemsPerPage(3); // Default value for other screen sizes
        }

        const fetchJobs = async () => {
            const userId = await profile();
            const res = await getUser(userId.data.email);
            const jobFollows = await jobFollowApi.getAllFollowsByUserId(res.data.id);
            console.log(jobFollows);
            const jobIds = jobFollows.data.map((jobFollow) => jobFollow.jobId);
            const jobPromises = jobIds.map((id) => jobApi.getJobById(id));
            const jobResponses = await Promise.all(jobPromises);
            const jobsData = jobResponses.map((response) => response.data);

            const skillsPromises = jobIds.map((id) => jobSkillApi.getAllSkillsByJobId(id));
            const skillsResponses = await Promise.all(skillsPromises);

            const skillsData = skillsResponses.reduce((acc, response, index) => {
                acc[jobIds[index]] = response.data || []; // Ensure response.data is defined
                return acc;
            }, {});
            console.log(skillsData);

            const companyPromises = jobsData.map((job) => companyApi.getCompanyById(job.companyId));
            const companyResponses = await Promise.all(companyPromises);

            const companyData = companyResponses.reduce((acc, response, index) => {
                acc[jobsData[index].companyId] = response.data; // Ensure response.data is defined
                return acc;
            }, {});

            const jobItemsData = jobsData.map((job) => ({
                idJob: job.id,
                title: job.title,
                companyName: companyData[job.companyId]?.name || "Unknown",
                salary: job.salary,
                location: companyData[job.companyId]?.address || "Unknown",
                skills: skillsData[job.id] || [],
            }));

            setJobItems(jobItemsData);
        };
        fetchJobs();
    }, [isLg]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        document.title = title ? `${title}` : "Không tìm thấy trang";
    }, [title]);

    return (
        <main className="min-h-screen bg-gray-100">
            <div className="container px-4 py-5 mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full">
                        <TabForm id={5} />
                        <div className="mt-2">
                            <div className="flex justify-start py-4 text-primary">
                                <h1 className="text-lg font-bold text-start">Việc Đã Theo Dõi</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                                {jobItems.map((item) => (
                                    <JobFollowCard key={item.idJob} job={item} />
                                ))}
                            </div>
                            <Pagination
                                count={Math.ceil(jobItems.length / itemsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                variant="outlined"
                                shape="rounded"
                                sx={{ marginTop: 5, display: "flex", justifyContent: "end" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
