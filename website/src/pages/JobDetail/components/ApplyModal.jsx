import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import recruitmentApi from "../../../services/apis/recruitmentApi";
import InputFileUpload from "../../../components/Forms/Inputs/InputFileUpload";

ApplicationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    job: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
};

export default function ApplicationModal({ currentUser, job, company, isOpen, onClose }) {
    const [fullName, setFullName] = useState(currentUser.fullName);
    const [email, setEmail] = useState(currentUser.email);
    const [phone, setPhone] = useState(currentUser.phone);
    const [coverLetter, setCoverLetter] = useState({});
    const [cv, setCV] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                userId: currentUser.id,
                jobId: job.id,
                status: 1,
                cv: cv,
                coverLetter: coverLetter,
            };

            const response = await recruitmentApi.applyJob(data);
            toast.success("Ứng tuyển thành công");
            console.log("Job application response:", response.data);
            onClose();
            // Optionally close the modal or show success message
        } catch (error) {
            console.log("Failed to apply for job: ", error);
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center p-4 z-50  ${isOpen ? "" : "hidden"}`}>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50"></div>

            {/* Modal */}
            <div className="relative z-50 w-11/12 bg-white rounded-lg shadow-lg md:w-[60%] max-h-screen overflow-y-scroll">
                <div className="flex items-center justify-between p-4 border-b">
                    <h5 className="text-xl font-bold">
                        Bạn đang ứng tuyển <span className="text-secondary">{job.title}</span> tại {company.name}
                    </h5>
                    <button
                        onClick={onClose}
                        className="text-gray-500 rounded-lg hover:text-gray-700 hover:shadow-lg hover:bg-slate-300"
                    >
                        <CloseIcon fontSize="medium" className="text-secondary" />
                    </button>
                </div>
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                value={fullName}
                                placeholder="Nguyễn Văn A"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                value={email}
                                placeholder="nguyenvana@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="block w-full p-2 mt-1 rounded-md shadow-sm focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                value={phone}
                                placeholder="0987654321"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="cv">
                                    CV của bạn
                                </label>
                                <InputFileUpload id="cv" name="cv" input={cv} setInput={setCV} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="coverLetter">
                                    Cover letter
                                </label>
                                <InputFileUpload
                                    id="coverLetter"
                                    name="coverLetter"
                                    input={coverLetter}
                                    setInput={setCoverLetter}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end col-span-1">
                            <button
                                onClick={onClose}
                                className="py-3 mr-2 font-bold text-white uppercase bg-gray-400 rounded-lg shadow-lg px-9 hover:bg-gray-500 hover:shadow-lg"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="py-3 font-bold text-white uppercase rounded-lg shadow-lg px-9 bg-primary lg:mx-0 hover:bg-primary-700 hover:shadow-lg"
                            >
                                Ứng tuyển
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
