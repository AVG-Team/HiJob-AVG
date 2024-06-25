import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TabsTitle = [
    { id: 1, title: "Thông Tin Cá Nhân", to: "/thong-tin-ca-nhan" },
    { id: 2, title: "Quản Lý Việc Làm", to: "/quan-ly-viec-lam" },
    { id: 3, title: "Quản Lý CV", to: "/quan-ly-cv" },
    { id: 4, title: "Việc Đã Ứng Tuyển", to: "/viec-lam-da-ung-tuyen" },
    { id: 5, title: "Việc Đang Theo Dõi", to: "/viec-lam-dang-theo-doi" },
];

export default function TabForm(props) {
    const { active, id } = props;
    const [tab, setTab] = useState(active);

    useEffect(() => {
        const activeIndex = TabsTitle.findIndex((item) => item.id === id);
        setTab(activeIndex >= 0 ? activeIndex : 0);
    }, [id]);

    TabForm.propTypes = {
        active: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
    };

    const handleTab = (index) => {
        setTab(index);
    };

    return (
        <div className="flex flex-col items-center mb-6">
            <div className="flex justify-start w-full overflow-x-auto border-b border-gray-200">
                <div className="flex">
                    {TabsTitle.map((item, index) => (
                        <a
                            href={item.to}
                            key={item.id}
                            onClick={() => handleTab(index)}
                            className={`px-5 py-2 rounded-t-lg font-semibold text-md whitespace-nowrap ${
                                tab === index
                                    ? "text-white bg-primary hover:bg-primary-600 hover:shadow-lg"
                                    : "text-gray-600 hover:bg-gray-200 hover:shadow-lg"
                            }`}
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
