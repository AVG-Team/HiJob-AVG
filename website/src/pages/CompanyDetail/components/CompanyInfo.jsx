import PropTypes from "prop-types";
import FolderIcon from "@mui/icons-material/Folder";

CompanyInfo.propTypes = {
    company: PropTypes.object,
    jobs: PropTypes.array,
};

export default function CompanyInfo({ company, jobs }) {
    let countJobOpen = jobs.length;
    return (
        <div className="flex items-center justify-center w-full pb-3 mt-2 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl p-6 overflow-hidden bg-white rounded shadow-lg lg:rounded-lg">
                <div className="relative">
                    <div className="absolute inset-0 bg-black opacity-25"></div>
                </div>
                <img
                    className="object-cover w-full h-48"
                    src="https://salt.topdev.vn/94_K1_VuSWec_otwWkNkdYMoVefrcT1dt6_Nc82Ffm4/fit/1080/1000/ce/1/aHR0cHM6Ly9hc3NldHMudG9wZGV2LnZuL2ltYWdlcy8yMDIxLzA0LzAyL0ZQVC1pbWFnZS0xLUIza3ZpLmpwZw"
                    alt="Company background"
                />
                <div className="p-4">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start">
                        <img
                            className="w-auto h-auto sm:w-auto sm:h-auto lg:w-auto lg:h-auto lg:mr-5"
                            src="https://salt.topdev.vn/SnfqHSzYiXPB7EBGwXtcn-12IXtdigJt6tWp387vOmE/fit/256/1000/ce/1/aHR0cHM6Ly9hc3NldHMudG9wZGV2LnZuL2ltYWdlcy8yMDIxLzA0LzEyL0ZQVFNPRlQtTG9nby1uZXctTlZmMmoucG5n"
                            alt="Company logo"
                        />
                        <div className="mt-4 leading-8 text-center sm:mt-0 sm:ml-0 lg:ml-0 sm:text-left">
                            <h2 className="text-lg font-bold sm:text-xl">{company.name}</h2>
                            <p className="mt-2 mb-1 text-sm text-gray-500">Chọn chúng tôi là sự lựa chọn đúng đắn</p>
                            <div className="flex items-center justify-center sm:justify-start">
                                <FolderIcon fontSize="small" className="text-primary-200"/>
                                <p className="ml-1 text-sm sm:text-md">{countJobOpen} vị trí tuyển dụng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
