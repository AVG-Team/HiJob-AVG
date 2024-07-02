import Card from "../../components/Card"
import React, { useEffect, useState } from "react";
import { Spin, Tabs } from "antd";
import jobService from "../../services/apis/JobService/JobService";
import CompanyService from"../../services/apis/CompanyService/CompanyService";
export default function Searching() {
    const [page, setPage] = useState(1); // Sửa từ 0 thành 1 vì API thường sử dụng trang bắt đầu từ 1
    const [pageSize, setPageSize] = useState(3);
    const [total, setTotal] = useState(0);
    const [contentOfJobs, setContentOfJobs] = useState([]);
    const [contentOfCompanies, setContentOfCompanies] = useState([]);
    const [type, setType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [tab, setTab] = useState(0);

    const handleShowMore =()=>{
        setPageSize(pageSize+3);
    }

    const handleTab = (index) => {
        setTab(index);
    };
    useEffect(() => {
        setIsLoading(true);
        const fetchJobsData = async () => {
            try {
                const { content, totalElements, size } = await jobService.getAllByPage({
                    type,
                    pageNo: page,
                    pageSize,
                });
                console.log(content);
                setContentOfJobs(content);
                setIsLoading(false);
                setTotal(Math.ceil(totalElements / size));
            } catch (error) {
                console.error("Error fetching data:", error);
                
            }
        };
        const fetchCompaniesData = async () => {
            try {
                const { content, totalElements, size } = await CompanyService.getAllByPage({
                    type,
                    pageNo: page,
                    pageSize,
                });
                console.log(content);
                setContentOfCompanies(content);
                setIsLoading(false);
                setTotal(Math.ceil(totalElements / size));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (tab === 1 || tab === 0) {
            fetchJobsData();
        }
        if (tab === 2 || tab === 0) {
            fetchCompaniesData();
        }
    }, [type, page, pageSize]);

    return (
        <div>
            <div className="container bg-white px-40">
                <div className="flex justify-start">
                    <div className="flex items-center">
                        <div className="relative flex items-center justify-center gap-3 py-2 w-[100px]" >
                            <button
                                onClick={() => handleTab(0)}
                                className={`px-5 py-2 rounded-t-lg ${
                                    tab === 0 ? "text-white bg-primary-200" : "text-gray-600"
                                }`}>
                                All
                            </button>
                        </div>
                        <div className="relative flex items-center justify-center gap-3 py-2 w-[100px]" >
                            <button
                                    onClick={() => handleTab(1)}
                                    className={`px-5 py-2 rounded-t-lg ${
                                        tab === 1 ? "text-white bg-primary-200" : "text-gray-600"
                                    }`} >
                                    Jobs
                            </button>
                        </div>
                        <div className="relative flex items-center justify-center gap-3 py-2 w-[100px]" >
                            <button
                                onClick={() => handleTab(2)}
                                className={`px-5 py-2 rounded-t-lg ${
                                    tab === 2 ? "text-white bg-primary-200" : "text-gray-600"
                                }`} >
                                Company
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {tab === 0 && (
                <div className="bg-gray-light py-8 flex justify-center bg-[#F1F1F1] ">
                <div className="container">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                           
                            <div className="mt-6">
                                <h1 className="text-md font-bold lg:text-x1">
                                    <span className="text-primary text-md">32 </span>
                                    jobs
                                    <span className="ml-2 inline-flex flex-wrap gap-2 font-normal">
                                    <span className="whitespace-nowrap text-md rounded border text-md font-normal inline-flex items-center justify-center border-solid 
                                            border-primary h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm lg:h-[2.375rem] lg:px-3 lg:text-base" >JavaScript</span>
                                    </span>
                                </h1>
                            </div>
                          
                            <Spin spinning={isLoading} >
                                {contentOfJobs.map(item => (
                                    <Card key={item.id} name={item.title} />
                                ))}
                            </Spin>
                            <div className="mx-auto mt-4 text-center max-lg:w[238px]">
                                <button className="inline-flex items-center justify-center border border-solid text-primary-600 text-md bg-transparent rounded w-full h-9
                                     border-primary font-semibold px-4 lg:text-base lg:px-6 lg:gap-3 transition-all" type="button" onClick={handleShowMore}>Show more</button>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <section className="rounded border border-solid border-primary-200">
                                    <div className="rounded-tl rounded-tr border-b border-solid border-primary-200 bg-primary-100 px-4 py-2">
                                        <h2 className="text-lg font-semibold">Job Highlight</h2>
                                    </div>
                                    <ul>
                                        <li className="border-t border-solid border-gray-200 first:border-t-0">
                                            <div className="CardJobList block rounded border border-solid border-white bg-white p-4">
                                                <div className="flex items-start gap-2">
                                                    <div className="w-[88px] bg-white">
                                                        <a className="inline-block" target="_blank" href="">
                                                            <img src="src/assets/img/saleCore.jpg" style={{ objectFit: "contain" }} alt="" loading="lazy" width="88" height="66" decoding="async" className="h-28 w-40 max-w-full rounded-xl bg-white p-2" />
                                                        </a>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="line-clamp-1 text-sm font-bold md:text-lg">
                                                            <a className="transition hover:text-primary" target="_blank" href="">Full-Stack Developer</a>
                                                        </h3>
                                                        <div className="line-clamp-1">
                                                            <a target="_blank" className="text-sm text-gray-500 transition-all hover:text-primary md:text-base" href="">SALESCORE</a>
                                                        </div>
                                                        <div className="mt-2 flex items-end">
                                                            <div className="line-clamp-1">
                                                                <a className="mr-2 inline-block" href="">
                                                                    <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid border-primary hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm">JavaScript</span>
                                                                </a>
                                                                <a className="mr-2 inline-block" href="">
                                                                    <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid border-primary hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm">JavaScript</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Thêm key cho phần tử li nếu lặp qua danh sách */}
                                        <li className="border-t border-solid border-gray-200 first:border-t-0">
                                            <div className="CardJobList block rounded border border-solid border-white bg-white p-4"></div>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            )}                            
             {tab === 1 && (
                <div className="bg-gray-light py-8 flex justify-center bg-[#F1F1F1] ">
                <div className="container">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                           
                            <div className="mt-6">
                                <h1 className="text-md font-bold lg:text-x1">
                                    <span className="text-primary">31 </span>
                                    jobs
                                    <span className="ml-2 inline-flex flex-wrap gap-2 font-normal">
                                    <span className="whitespace-nowrap rounded border text-md font-normal inline-flex items-center justify-center border-solid 
                                            border-primary h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm lg:h-[2.375rem] lg:px-3 lg:text-base" >JavaScript</span>
                                    </span>
                                </h1>
                            </div>
                          
                            <Spin spinning={isLoading} >
                                {contentOfJobs.map(item => (
                                    <Card key={item.id} name={item.title} />
                                ))}
                            </Spin>
                            <div className="mx-auto mt-4 text-center max-lg:w[238px]">
                                <button className="inline-flex items-center justify-center border border-solid text-primary-600 text-md bg-transparent rounded w-full h-9
                                     border-primary font-semibold px-4 lg:text-base lg:px-6 lg:gap-3 transition-all" type="button" onClick={handleShowMore}>Show more</button>
                            </div>


                        </div>
                        <div className="col-span-1">
                            <div>
                                <section className="rounded border border-solid border-primary-200">
                                    <div className="rounded-tl rounded-tr border-b border-solid border-primary-200 bg-primary-100 px-4 py-2">
                                        <h2 className="text-lg text-md font-semibold">Job Highlight</h2>
                                    </div>
                                    <ul>
                                        <li className="border-t border-solid border-gray-200 first:border-t-0">
                                            <div className="CardJobList block rounded border border-solid border-white bg-white p-4">
                                                <div className="flex items-start gap-2">
                                                    <div className="w-[88px] bg-white">
                                                        <a className="inline-block" target="_blank" href="">
                                                            <img src="src/assets/img/saleCore.jpg" style={{ objectFit: "contain" }} alt="" loading="lazy" width="88" height="66" decoding="async" className="h-28 w-40 max-w-full rounded-xl bg-white p-2" />
                                                        </a>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="line-clamp-1 text-sm font-bold md:text-lg">
                                                            <a className="text-md transition hover:text-primary" target="_blank" href="">Full-Stack Developer</a>
                                                        </h3>
                                                        <div className="line-clamp-1">
                                                            <a target="_blank" className="text-md text-gray-500 transition-all hover:text-primary md:text-base" href="">SALESCORE</a>
                                                        </div>
                                                        <div className="mt-2 flex items-end">
                                                            <div className="line-clamp-1">
                                                                <a className="mr-2 inline-block" href="">
                                                                    <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid border-primary hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm">JavaScript</span>
                                                                </a>
                                                                <a className="mr-2 inline-block" href="">
                                                                    <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid border-primary hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm">JavaScript</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Thêm key cho phần tử li nếu lặp qua danh sách */}
                                        <li className="border-t border-solid border-gray-200 first:border-t-0">
                                            <div className="CardJobList block rounded border border-solid border-white bg-white p-4"></div>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            )}
             {tab === 2 && (
                <div className="bg-gray-light py-8 flex justify-center bg-[#F1F1F1] ">
                <div className="container">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                           
                            <div className="mt-6">
                                <h1 className="text-sm font-bold lg:text-x1">
                                    <span className=" text-md text-primary">Companies Information </span>
                                    
                                    
                                </h1>
                            </div>
                          
                            <Spin spinning={isLoading} >
                                {contentOfCompanies.map(item => (
                                    <Card key={item.id} name={item.name} />
                                ))}
                            </Spin>
                            <div className="mx-auto mt-4 text-center max-lg:w[238px]">
                                <button className="inline-flex items-center justify-center border border-solid text-primary-600 text-md bg-transparent rounded w-full h-9
                                     border-primary font-semibold px-4 lg:text-base lg:px-6 lg:gap-3 transition-all" type="button" onClick={handleShowMore}>Show more</button>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <section className="rounded border border-solid border-primary-200">
                                    <div className="rounded-tl rounded-tr border-b border-solid border-primary-200 bg-primary-100 px-4 py-2">
                                        <h2 className="text-lg text-md font-semibold">Job Highlight</h2>
                                    </div>
                                    <ul>
                                        <li className="border-t border-solid border-gray-200 first:border-t-0">
                                            <div className="CardJobList block rounded border border-solid border-white bg-white p-4">
                                                <div className="flex items-start gap-2">
                                                    <div className="w-[88px] bg-white">
                                                        <a className="inline-block" target="_blank" href="">
                                                            <img src="src/assets/img/saleCore.jpg" style={{ objectFit: "contain" }} alt="" loading="lazy" width="88" height="66" decoding="async" className="h-28 w-40 max-w-full rounded-xl bg-white p-2" />
                                                        </a>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="line-clamp-1 text-sm font-bold md:text-lg">
                                                            <a className="text-md transition hover:text-primary" target="_blank" href="">Full-Stack Developer</a>
                                                        </h3>
                                                        <div className="line-clamp-1">
                                                            <a target="_blank" className="text-md text-gray-500 transition-all hover:text-primary md:text-base" href="">SALESCORE</a>
                                                        </div>
                                                        <div className="mt-2 flex items-end">
                                                            <div className="line-clamp-1">
                                                                <a className="mr-2 inline-block" href="">
                                                                    <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid border-primary hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm">JavaScript</span>
                                                                </a>
                                                                <a className="mr-2 inline-block" href="">
                                                                    <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid border-primary hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm">JavaScript</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Thêm key cho phần tử li nếu lặp qua danh sách */}
                                        <li className="border-t border-solid border-gray-200 first:border-t-0">
                                            <div className="CardJobList block rounded border border-solid border-white bg-white p-4"></div>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            )}      
        </div>
    );
}