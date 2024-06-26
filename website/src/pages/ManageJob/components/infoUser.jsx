import { useState } from "react";

export default function InfoUser() {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                    <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 10a3 3 0 100-6 3 3 0 000 6zm-7 8a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="ml-4">
                    <div className="text-xl font-medium text-gray-900">Nguyễn Mai Bảo Huy</div>
                    <div className="text-sm font-semibold text-green-600">Standard</div>
                </div>
            </div>
            <div className="p-4 mb-4 rounded-lg bg-secondary-50">
                <div className="flex items-center justify-between mb-4 ">
                    <div className="text-lg font-medium text-gray-900">Đang tìm việc</div>
                    <button
                        className={`relative inline-block w-12 h-6 rounded-full transition duration-200 ease-in-out ${
                            isToggled ? "bg-green-400" : "bg-gray-300"
                        }`}
                        onClick={handleToggle}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                handleToggle();
                            }
                        }}
                    >
                        <span
                            className={`absolute left-0 top-0 w-6 h-6 bg-white border-2 rounded-full transition-transform duration-200 ease-in-out transform ${
                                isToggled ? "translate-x-6 border-green-400" : "border-gray-300"
                            }`}
                        />
                    </button>
                </div>
                <p className="text-sm text-gray-600 ">
                    Bật trạng thái “Đang tìm việc” giúp bạn tăng <span className="font-semibold text-red-500">75%</span>{" "}
                    cơ hội tìm được việc làm.
                </p>
            </div>
        </div>
    );
}
