import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import FlagIcon from "@mui/icons-material/Flag";

export default function AboutComp() {
    return (
        <div className="flex items-center justify-center mt-5 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl p-6 text-gray-600 bg-white rounded shadow-lg lg:rounded-lg">
                <h1 className="mb-2 text-xl font-bold">Công ty</h1>
                <h2 className="mb-4 text-lg">OPES</h2>
                <div className="flex flex-col items-center justify-between mb-6 space-y-4 sm:flex-row sm:space-y-0">
                    <div className="text-center">
                        <BusinessIcon className="mx-auto mb-2" fontSize="large" />
                        <p className="font-semibold">Ngành nghề</p>
                        <p>Bảo Hiểm</p>
                    </div>
                    <div className="text-center">
                        <GroupsIcon className="mx-auto mb-2" fontSize="large" />
                        <p className="font-semibold">Quy mô công ty</p>
                        <p>100-499</p>
                    </div>
                    <div className="text-center">
                        <FlagIcon className="mx-auto mb-2" fontSize="large" />
                        <p className="font-semibold">Quốc tịch công ty</p>
                        <p>Vietnam</p>
                    </div>
                </div>
                <div className="mb-6">
                    <h3 className="mb-2 text-lg font-bold">Về chúng tôi</h3>
                    <p className="text-sm text-gray-600 sm:text-md">
                        Ra đời từ 2018, Công ty Cổ phần Bảo hiểm OPES mang trong mình DNA vượt trội, luôn tiên phong ứng
                        dụng các giải pháp công nghệ cao để cung cấp những sản phẩm số hóa, đơn giản, tiện lợi và được
                        cá nhân hóa, cũng như luôn sáng tạo & đổi mới để cải tiến sản phẩm và dịch vụ...
                        <span className="text-blue-500 cursor-pointer"> đọc thêm</span>
                    </p>
                </div>
                <div className="flex mb-6 space-x-4">
                    {/* <img src="/path/to/image1.jpg" alt="Company Image 1" className="w-1/3 rounded-lg" />
                    <img src="/path/to/image2.jpg" alt="Company Image 2" className="w-1/3 rounded-lg" />
                    <img src="/path/to/image3.jpg" alt="Company Image 3" className="w-1/3 rounded-lg" /> */}
                </div>
                <div className="flex items-center justify-center w-full">
                    <a href="/" className="font-bold text-primary hover:text-primary-600">
                        Xem công ty
                    </a>
                </div>
            </div>
        </div>
    );
}
