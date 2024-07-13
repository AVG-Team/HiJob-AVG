import PropTypes from "prop-types";
import Detail from "./components/Detail";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AboutJob from "./components/AboutJob";
import AboutComp from "./components/AboutComp";
import jobApi from "../../services/apis/jobApi";
import ApplyModal from "./components/ApplyModal";
import CompanyInfo from "./components/CompanyInfo";
import jobTypeApi from "../../services/apis/jobTypeApi";
import companyApi from "../../services/apis/companyApi";
import jobSkillApi from "../../services/apis/jobSkillApi.js";
import jobLevelApi from "../../services/apis/jobLevelApi";
import contractTypeApi from "../../services/apis/contractTypeApi";
import { checkAuth, getUserInfo } from "../../services/auth/auth.js";
import { profile, getUser } from "../../services/apis/profile.js";
import recruitmentApi from "../../services/apis/recruitmentApi.js";

JobDetail.propTypes = {
    title: PropTypes.string,
};

export default function JobDetail(props) {
    const [job, setJob] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [type, setType] = useState([]);
    const [skill, setSkill] = useState([]);
    const [level, setLevel] = useState([]);
    const [company, setCompany] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [contractType, setContractType] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applied, setApplied] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch job detail
                const response = await jobApi.getJobById(id);
                setJob(response.data);

                // Fetch company detail
                const companyResponse = await companyApi.getCompanyById(response.data.companyId);
                setCompany(companyResponse.data);

                // Fetch skill
                const skillResponse = await jobSkillApi.getAllSkillsByJobId(response.data.id);
                setSkill(skillResponse.data);

                // Fetch job level
                const jobResponse = await jobLevelApi.getAllLevelByJobId(response.data.id);
                setLevel(jobResponse.data);

                // Fetch type
                const typeResponse = await jobTypeApi.getAllTypeByJobId(response.data.id);
                setType(typeResponse.data);

                // Fetch contract type
                const contractTypeResponse = await contractTypeApi.getAllContractTypeByContractId(response.data.id);
                setContractType(contractTypeResponse.data);

                if (checkAuth()) {
                    setIsAuth(true);
                    const { role } = getUserInfo();
                    if (role === "USER") {
                        setIsUser(true);
                    }
                }

                // Fetch user info
                const responseProfile = await profile();
                const responseUser = await getUser(responseProfile.data.email);
                setUserInfo(responseUser.data);

                // Check if user has applied for this job
                const responseRecruitment = await recruitmentApi.getRecruitmentByUserIdAndJobId(
                    id,
                    responseUser.data.id,
                );
                if (responseRecruitment.data) {
                    setApplied(true);
                } else {
                    setApplied(false);
                }
            } catch (error) {
                console.log("Failed to fetch job detail: ", error);
            }
        };
        fetchData();
    }, []);

    const { title } = props;
    useEffect(() => {
        document.title = title ? `${title}` : "Page Does Not Exist";
    }, [title]);

    return (
        <main className="flex items-center justify-center bg-primary-50">
            <div className="w-full lg:px-20">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="py-2 lg:col-span-2">
                        <CompanyInfo job={job} company={company} currentUser={userInfo} isAuth={isAuth} />
                        <Detail job={job} />
                        <AboutComp company={company} />
                    </div>
                    <div className="py-2 mb-5 lg:col-span-1">
                        <div className="w-full mt-2">
                            {isAuth && isUser ? (
                                applied ? (
                                    <button className="w-full py-6 font-bold text-white bg-gray-500 cursor-not-allowed rounded-xl">
                                        Đã ứng tuyển
                                    </button>
                                ) : (
                                    <button
                                        onClick={openModal}
                                        className="w-full py-6 font-bold text-white rounded-xl bg-secondary hover:bg-secondary-400 hover:shadow-lg"
                                    >
                                        Ứng tuyển ngay
                                    </button>
                                )
                            ) : (
                                <button className="w-full py-6 font-bold text-white rounded-xl bg-secondary hover:bg-secondary-400 hover:shadow-lg">
                                    <Link to="/login">Đăng nhập để ứng tuyển</Link>
                                </button>
                            )}
                        </div>
                        <AboutJob job={job} skill={skill} type={type} level={level} contractType={contractType} />
                    </div>
                </div>
            </div>
            <ApplyModal currentUser={userInfo} job={job} company={company} isOpen={isModalOpen} onClose={closeModal} />
        </main>
    );
}
