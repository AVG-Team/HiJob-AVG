import { useEffect } from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Detail from "./components/Detail.jsx";
import { useParams } from "react-router-dom";
import Contact from "./components/Contact.jsx";
import jobApi from "../../services/apis/jobApi.js";
import AboutComp from "./components/AboutComp.jsx";
import CompanyInfo from "./components/CompanyInfo.jsx";
import companyApi from "../../services/apis/companyApi.js";

CompanyDetail.propTypes = {
    title: PropTypes.string,
};

export default function CompanyDetail(props) {
    const [jobs, setJobs] = useState([]);
    const [company, setCompany] = useState({});
    const { title } = props;

    const { id } = useParams();

    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";

        const fetchCompany = async () => {
            try {
                const response = await companyApi.getCompanyById(id);
                setCompany(response.data);
            } catch (error) {
                console.error("Failed to fetch company: ", error);
            }
        };
        fetchCompany();

        const fetchJobByCompany = async () => {
            try {
                const response = await jobApi.getJobByCompany(id);
                setJobs(response.data.content);
            } catch (error) {
                console.error("Failed to fetch job: ", error);
            }
        };

        fetchJobByCompany();
    }, [title, id]);

    return (
        <main className="flex items-center justify-center bg-primary-50 main-content">
            <div className="w-full lg:px-20">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="py-2 lg:col-span-2">
                        <CompanyInfo company={company} jobs={jobs} />
                        <Detail company={company} jobs={jobs} />
                    </div>
                    <div className="py-2 mb-5 lg:col-span-1">
                        <AboutComp company={company} />
                        <Contact company={company} />
                    </div>
                </div>
            </div>
        </main>
    );
}
