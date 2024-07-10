import Lottie from "lottie-react";
import React, { useEffect, useState,useRef } from "react";
import Hero from "../../assets/img/hero-lottie.json";
import jobApi from "../../services/apis/jobApi";
import{ AutoComplete }from "antd";

export default function Banner({onSearchResults}) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [keyword, setKeyword] = useState("");
    const inputRef = useRef(null);
    const handleSearchClick = async () => {
        const inputValue = inputRef.current.value;
        setKeyword(inputValue);
        await fetchJobsData(inputValue);
    };

    const fetchJobsData = async (keyword) => {
        try {
            const response = await jobApi.findJobsByTitle({
                field: keyword,
                pageNo: page,
                pageSize: pageSize
            });
            onSearchResults(response.data.content);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

  return (
        <div className="pt-8 bg-gradient-to-b from-white to-primary-200">
            <div className="container flex flex-col flex-wrap items-center px-3 mx-auto md:flex-row">
                <div
                    data-aos="fade-left"
                    className="flex flex-col items-start justify-center w-full text-center px-7 md:w-[50%] md:text-left mt-5"
                >
                    <p className="w-full font-bold lg:text-lg text-md">
                        Chúng tôi có hơn <span className="text-secondary">208.000+</span> việc làm trực tiếp
                    </p>
                    <h1 className="my-4 text-4xl font-bold leading-snug lg:text-5xl">
                        Tìm <span className="text-primary">Công Việc</span> Phù Hợp Với Cuộc Sống Bạn
                    </h1>
                    <p className="mb-8 leading-normal text-gray-500 lg:text-lg text-md">
                        Nhập từ khóa và sau đó nhấp vào tìm kiếm để tìm công việc hoàn hảo của bạn.
                    </p>
                    <div className="w-full p-2 bg-white border rounded-lg shadow-lg">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="col-span-3">
                                {/* <label htmlFor="job" className="block px-4 text-sm font-bold uppercase text-primary">
                                    Công Việc
                                </label> */}
                                <input
                                    type="text"
                                    id="job"
                                    ref={inputRef}
                                    placeholder="Nhập từ khóa công việc bạn muốn tìm kiếm..."
                                    className="w-full p-3 border rounded-lg focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                />
                            </div>
                            <div className="flex items-center justify-center col-span-1">
                                <button onClick={handleSearchClick} id="buttonSearch" className="px-8 py-3 font-bold text-white uppercase rounded-lg shadow-lg bg-primary lg:mx-0 hover:bg-primary-600 hover:shadow-lg">
                                    tìm việc
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-start mt-4 space-x-2">
                            <p className="text-sm opacity-75">Từ khoá đề xuất :</p>
                            {["Java", "C++", "JavaScript", "UI/UX", "C#"].map((keyword) => (
                                <button
                                    key={keyword}
                                    className="px-2 py-1 mt-1 text-sm text-white rounded-md bg-primary hover:bg-primary-600 hover:shadow-lg"
                                >
                                    {keyword}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" className="w-full px-5 py-6 text-center md:w-[50%]">
                    <Lottie className="z-50 w-full md:w-[95%]" alt="hero" animationData={Hero} />
                </div>
            </div>
            <div className="relative -mt-12 lg:-mt-24">
                <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fillRule="nonzero">
                            <path
                                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                                opacity="0.100000001"
                            ></path>
                            <path
                                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                                opacity="0.100000001"
                            ></path>
                            <path
                                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                                id="Path-4"
                                opacity="0.200000003"
                            ></path>
                        </g>
                        <g transform="translate(-4.000000, 76.000000)" fill="#FFFFFF" fillRule="nonzero">
                            <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
}
