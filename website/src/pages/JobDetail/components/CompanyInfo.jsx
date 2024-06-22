import Lottie from "lottie-react";
import Assignment from "../../../assets/img/assignment.json";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function CompanyInfo() {
    return (
        <div className="flex items-center justify-center w-full pb-3 mt-2 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl p-6 overflow-hidden bg-white rounded shadow-lg lg:rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="p-2 bg-white rounded-full">
                            <Lottie animationData={Assignment} className="w-12 sm:w-20" />
                        </div>
                        <div className="ml-4 leading-8">
                            <h2 className="text-lg font-bold sm:text-xl">Java Engineer (Middle and above)</h2>
                            <p className="mt-2 mb-1 text-sm text-gray-500">SoftRoad Việt Nam</p>
                            <div className="flex items-center">
                                <LocationOnIcon fontSize="small" className="text-gray-200" />
                                <p className="ml-1 text-sm sm:text-md">
                                    Tầng 14, Richy Tower, Phường Yên Hoà, Quận Cầu Giấy, Thành phố Hà Nội
                                </p>
                            </div>
                            <div className="flex items-center">
                                <PaymentsIcon fontSize="small" className="text-gray-200" />
                                <p className="ml-1 text-sm font-bold sm:text-md text-secondary">
                                    Đăng nhập để xem mức lương
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-20 ml-4 text-3xl font-semibold text-primary lg:text-6xl opacity-80 hover:text-primary-600 hover:shadow-lg">
                        <BookmarkBorderIcon fontSize="inherit" />
                    </div>
                </div>
            </div>
        </div>
    );
}
