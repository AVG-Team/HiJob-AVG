import { useState } from "react";
import { AboutJob, Benefits, Requirements, Responsibilities } from "../../../mocks/detail";

export default function Detail() {
    const [tab, setTab] = useState(0);

    const handleTab = (index) => {
        setTab(index);
    };

    return (
        <div className="flex items-center justify-center mt-5 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl p-6 bg-white rounded shadow-lg lg:rounded-lg">
                <div className="flex flex-col items-center mb-6">
                    <div className="flex justify-start w-full border-b border-gray-200">
                        <button
                            onClick={() => handleTab(0)}
                            className={`px-4 py-2 rounded-t-lg font-semibold ${
                                tab === 0 ? "text-white bg-secondary" : "text-gray-600"
                            }`}
                        >
                            Mô tả công việc
                        </button>
                        <button
                            onClick={() => handleTab(1)}
                            className={`px-4 py-2 rounded-t-lg font-semibold ${
                                tab === 1 ? "text-white bg-secondary" : "text-gray-600"
                            }`}
                        >
                            Thông Tin Về Công Ty
                        </button>
                    </div>
                </div>
                {tab === 0 && (
                    <div className="w-full mx-auto space-y-6 text-gray-600">
                        <div className="flex-1">
                            <div className="flex items-center justify-start pt-2 pb-3 border-b">
                                {AboutJob.map((item) => (
                                    <p key={item.id} className="text-sm lg:text-md">
                                        {item.content}
                                    </p>
                                ))}
                            </div>
                            <div className="flex-1 pt-2 pb-3 border-b">
                                <h2 className="mb-4 text-lg font-bold sm:text-xl">Trách nhiệm công việc</h2>
                                <ul className="list-disc list-inside">
                                    {Responsibilities.map((item) => (
                                        <li key={item.id} className="mb-2 ml-5 text-sm lg:text-md">
                                            {item.content}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 pt-2 pb-3 border-b">
                                <h2 className="mb-4 text-lg font-bold sm:text-xl">Kĩ nằng & Chuyên môn</h2>
                                <ul className="list-disc list-inside">
                                    {Requirements.map((item) => (
                                        <li key={item.id} className="mb-2 ml-5 text-sm lg:text-md">
                                            {item.content}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 pt-2 pb-3 border-b">
                                <h2 className="mb-4 text-lg font-bold sm:text-xl">Phúc lợi cho bạn</h2>
                                <ul className="list-disc list-inside">
                                    {Benefits.map((item) => (
                                        <li key={item.id} className="mb-2 ml-5 text-sm lg:text-md">
                                            {item.content}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
