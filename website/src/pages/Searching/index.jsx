import Card from "../../components/Card";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import jobApi from "../../services/apis/jobApi";
import levelApi from "../../services/apis/levelApi";
import contractApi from "../../services/apis/contractApi";
import typeApi from "../../services/apis/typeApi";
import skillApi from "../../services/apis/skillApi";
import companyApi from "../../services/apis/companyApi";
import Pagination from "@mui/material/Pagination";

export default function Searching({results}) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [total, setTotal] = useState(0);
    const [contentOfJobs, setContentOfJobs] = useState([]);
    const [contentOfCompanies, setContentOfCompanies] = useState([]);
    const [type, setType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [tab, setTab] = useState(0);
    const [types, setTypes] = useState([]);
    const [levels, setLevels] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [skills, setSkills] = useState([]);
    const [jobKeyword, setJobKeyword] = useState('');
    const [timer, setTimer] = useState(null);
    const [selected, setSelected] = useState([]);
    const [formData, setFormData] = useState({
        level: "",
        type: "",
        contract: "",
        skil: ""
    });


    const handleInputChange = async (e) => {
        const { id, value } = e.target;
        
        await setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    
      
    };


    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleTab = (index) => {
        setTab(index);
    };

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const responseSkill = await skillApi.getAllSkills();
                setSkills(responseSkill.data);
            } catch (error) {
                console.log("Failed to fetch skill: ", error);1
            }
        };
        fetchSkill();
    }, []);

    useEffect(() => {
        const fetchType = async () => {
            try {
                const responseType = await typeApi.getAllType();
                setTypes(responseType.data);
            } catch (error) {
                console.log("Failed to fetch type: ", error);
            }
        };

        fetchType();
    }, []);

    useEffect(() => {
        const fetchLevel = async () => {
            try {
                const responseLevel = await levelApi.getAllLevel();
                setLevels(responseLevel.data);
            } catch (error) {
                console.log("Failed to fetch level: ", error);
            }
        };
        fetchLevel();
    }, []);

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const response = await contractApi.getAllContract();
                setContracts(response.data);
            } catch (error) {
                console.log("Failed to fetch contract: ", error);
            }
        };
        fetchContract();
    }, []);


    useEffect(() => {
        const hasData = Object.values(formData).some(value => value !== "");

        if (hasData) {
            console.log(formData.contract, formData.level, formData.skil, formData.type);
            const fetchJobsByFilter = async () => {
                try {
                    const response = await jobApi.findJobsByFilter({
                        jobLevel: formData.level,
                        jobType: formData.type,
                        jobSkill: formData.skil,
                        contractType: formData.contract,
                        pageNo: page,
                        pageSize: pageSize
                    });
                    console.log(response.data.totalElements);
                    setContentOfJobs(response.data.content);
                    setTotal(Math.ceil(response.data.totalElements / pageSize));
                } catch (error) {
                    console.log("Failed to fetch contract: ", error);
                }
            };

            fetchJobsByFilter();
        }
    }, [formData])
        
    useEffect(() => {
        setIsLoading(true);
        const fetchJobsData = async () => {
            try {
                const response = await jobApi.findJobsByTitle({
                    pageNo: page,
                    pageSize: pageSize
                });
            
                setContentOfJobs(response.data.content);
                console.log(response.data.totalElements);
                setTotal(Math.ceil(response.data.totalElements/ pageSize));
                console.log(total);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchCompaniesData = async () => {
            try {
                const response= await companyApi.getCompanies({pageNo:page,pageSize: pageSize});
                setContentOfCompanies(response.data.content);
                setIsLoading(false);
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

    useEffect(() => {
        console.log(results);
        setContentOfJobs(results);
        
    }, [results]);
    return (
        <div>
            <div className="py-8 ml-6 mr-6 mx-4">
                <div className="rounded border border-solid border-primary-50 shadow-lg">
                    <div className="bg-primary-50 px-4 sm:px-80">
                        <div className="flex justify-start">
                            <div className="flex items-center">
                                <div className="relative flex items-center justify-center gap-3 py-2 w-[100px]">
                                    <button
                                        onClick={() => handleTab(0)}
                                        className={`px-5 py-2 rounded-t-lg ${
                                            tab === 0 ? "text-white bg-primary-400" : "text-gray-600"
                                        }`}
                                    >
                                        All
                                    </button>
                                </div>
                                <div className="relative flex items-center justify-center gap-3 py-2 w-[100px]">
                                    <button
                                        onClick={() => handleTab(1)}
                                        className={`px-5 py-2 rounded-t-lg ${
                                            tab === 1 ? "text-white bg-primary-400" : "text-gray-600"
                                        }`}
                                    >
                                        Jobs
                                    </button>
                                </div>
                                <div className="relative flex items-center justify-center gap-3 py-2 w-[100px]">
                                    <button
                                        onClick={() => handleTab(2)}
                                        className={`px-5 py-2 rounded-t-lg ${
                                            tab === 2 ? "text-white bg-primary-400" : "text-gray-600"
                                        }`}
                                    >
                                        Company
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="type">
                                Loại Hình Làm Việc
                            </label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                                required
                            >
                                <option value={0}>Chọn loại hình làm việc</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.typeName}>
                                        {type.typeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="contract">
                                Loại Hợp Đồng
                            </label>
                            <select
                                id="contract"
                                value={formData.contract}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            >
                                <option value={0}>Chọn loại hợp đồng</option>
                                {contracts.map((contract) => (
                                    <option key={contract.id} value={contract.typeName}>
                                        {contract.typeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="level">
                                Loại Cấp Bậc
                            </label>
                            <select
                                id="level"
                                value={formData.level}
                                onChange={handleInputChange}
                                className="block w-full p-2 mt-1 rounded-md shadow-sm bg-slate-200 focus:border-primary-500 focus:outline-none focus:shadow-lg"
                            >
                                <option value={0}>Chọn loại cấp bậc</option>
                                {levels.map((level) => (
                                    <option key={level.id} value={level.levelName}>
                                        {level.levelName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                    </div>
                    {tab === 0 && (
                        <div className="bg-gray-light py-8 flex justify-center">
                            <div className="container">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="col-span-2 ml-6 mr-6">
                                        <div>
                                            <h1 className="text-md font-bold lg:text-x1">
                                                <span className="text-red-500 text-md">32 </span>
                                                jobs
                                                <span className="ml-2 inline-flex flex-wrap gap-2 font-normal">
                                                    <span className="whitespace-nowrap text-md rounded border text-md font-normal inline-flex items-center justify-center border-solid
                                                            h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm lg:h-[2.375rem] lg:px-3 lg:text-base bg-blue-100 text-blue-500">
                                                        JavaScript
                                                    </span>
                                                </span>
                                            </h1>
                                        </div>
                                        <div>
                                            <Spin spinning={isLoading}>
                                                {contentOfJobs.map((item) => (
                                                    <Card key={item.id} name={item.title} require_of_year = {item.require_of_year}
                                                     benefits = {item.benefits} requirements = {item.requirements} salary = {item.salary}
                                                     responsibilities = {item.responsibilities} />
                                                ))}
                                            </Spin>
                                        </div>
                                        <div className="mx-auto mt-4 text-center sm:max-lg:w[238px]">
                                              <Pagination
                                                    count={total}
                                                    page={page}
                                                    onChange={handleChangePage}
                                                    variant="outlined"
                                                    shape="rounded"
                                                    sx={{ marginTop: 5, display: "flex", justifyContent: "end" }}
                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1 ml-6">
                                        <div>
                                            <section className="rounded border border-solid border-orange-400 sm:mr-6">
                                                <div className="rounded-tl rounded-tr border-b border-solid bg-orange-400 px-4 py-2">
                                                    <h2 className="text-lg font-semibold">Job Highlight</h2>
                                                </div>
                                                <ul>
                                                    <li className="border-t border-solid border-gray-200 first:border-t-0">
                                                        <div className="CardJobList block rounded border border-solid border-white bg-white p-4">
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-[88px] bg-white">
                                                                    <a className="inline-block" target="_blank" href="">
                                                                        <img
                                                                            src="src/assets/img/saleCore.jpg"
                                                                            style={{ objectFit: "contain" }}
                                                                            alt=""
                                                                            loading="lazy"
                                                                            width="88"
                                                                            height="66"
                                                                            decoding="async"
                                                                            className="h-28 w-40 max-w-full rounded-xl bg-white p-2"
                                                                        />
                                                                    </a>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h3 className="line-clamp-1 text-sm font-bold md:text-lg">
                                                                        <a className="transition hover:text-primary" target="_blank" href="">
                                                                            Full-Stack Developer
                                                                        </a>
                                                                    </h3>
                                                                    <div className="line-clamp-1">
                                                                        <a
                                                                            target="_blank"
                                                                            className="text-sm text-gray-500 transition-all hover:text-primary md:text-base"
                                                                            href=""
                                                                        >
                                                                            SALESCORE
                                                                        </a>
                                                                    </div>
                                                                    <div className="mt-2 flex items-end">
                                                                        <div className="line-clamp-1">
                                                                            <a className="mr-2 inline-block" href="">
                                                                                <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm bg-blue-100 text-blue-500">
                                                                                    JavaScript
                                                                                </span>
                                                                            </a>
                                                                            <a className="mr-2 inline-block" href="">
                                                                                <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm bg-blue-100 text-blue-500">
                                                                                    JavaScript
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
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
                        <div className="bg-gray-light py-8 flex justify-center">
                            <div className="container">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="col-span-2 ml-6 mr-6">
                                        <div>

                                            <h1 className="text-md font-bold lg:text-x1">
                                                <span className="text-red-500 text-md">31 </span>
                                                jobs
                                                <span className="ml-2 inline-flex flex-wrap gap-2 font-normal">
                                                    <span className="whitespace-nowrap text-md rounded border text-md font-normal inline-flex items-center justify-center border-solid
                                                            h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm lg:h-[2.375rem] lg:px-3 lg:text-base bg-blue-100 text-blue-500">
                                                        JavaScript
                                                    </span>
                                                </span>
                                            </h1>
                                        </div>
                                        <Spin spinning={isLoading}>
                                            {contentOfJobs.map((item) => (
                                                <Card key={item.id} name={item.title}/>
                                            ))}
                                        </Spin>
                                        <div className="mx-auto mt-4 text-center sm:max-lg:w[238px]">
                                            <button
                                                className="inline-flex items-center justify-center border border-solid text-primary-600 text-md bg-transparent rounded w-full h-9
                                                 border-primary font-semibold px-4 lg:text-base lg:px-6 lg:gap-3 transition-all"
                                                type="button"
                                                onClick={handleShowMore}
                                            >
                                                Show more
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-span-1 ml-6">
                                        <div>
                                            <section className="rounded border border-solid border-orange-400 sm:mr-6">
                                                <div className="rounded-tl rounded-tr border-b border-solid bg-orange-400 px-4 py-2">
                                                    <h2 className="text-lg font-semibold">Job Highlight</h2>
                                                </div>
                                                <ul>
                                                    <li className="border-t border-solid border-gray-200 first:border-t-0">
                                                        <div className="CardJobList block rounded border border-solid border-white bg-white p-4">
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-[88px] bg-white">
                                                                    <a className="inline-block" target="_blank" href="">
                                                                        <img
                                                                            src="src/assets/img/saleCore.jpg"
                                                                            style={{ objectFit: "contain" }}
                                                                            alt=""
                                                                            loading="lazy"
                                                                            width="88"
                                                                            height="66"
                                                                            decoding="async"
                                                                            className="h-28 w-40 max-w-full rounded-xl bg-white p-2"
                                                                        />
                                                                    </a>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h3 className="line-clamp-1 text-sm font-bold md:text-lg">
                                                                        <a className="transition hover:text-primary" target="_blank" href="">
                                                                            Full-Stack Developer
                                                                        </a>
                                                                    </h3>
                                                                    <div className="line-clamp-1">
                                                                        <a
                                                                            target="_blank"
                                                                            className="text-sm text-gray-500 transition-all hover:text-primary md:text-base"
                                                                            href=""
                                                                        >
                                                                            SALESCORE
                                                                        </a>
                                                                    </div>
                                                                    <div className="mt-2 flex items-end">
                                                                        <div className="line-clamp-1">
                                                                            <a className="mr-2 inline-block" href="">
                                                                                <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm bg-blue-100 text-blue-500">
                                                                                    JavaScript
                                                                                </span>
                                                                            </a>
                                                                            <a className="mr-2 inline-block" href="">
                                                                                <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm bg-blue-100 text-blue-500">
                                                                                    JavaScript
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
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
                        <div className="bg-gray-light py-8 flex justify-center">
                            <div className="container">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="col-span-2 ml-6 mr-6">
                                        <div>

                                            <h1 className="text-md font-bold lg:text-x1">
                                                <span className=" text-md text-primary">Company Information </span>


                                            </h1>
                                        </div>
                                        <Spin spinning={isLoading}>
                                            {contentOfCompanies.map((item) => (
                                                <Card key={item.id} name={item.name}/>
                                            ))}
                                        </Spin>
                                        <div className="mx-auto mt-4 text-center sm:max-lg:w[238px]">
                                            <button
                                                className="inline-flex items-center justify-center border border-solid text-primary-600 text-md bg-transparent rounded w-full h-9
                                                 border-primary font-semibold px-4 lg:text-base lg:px-6 lg:gap-3 transition-all"
                                                type="button"
                                                onClick={handleShowMore}
                                            >
                                                Show more
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-span-1 ml-6">
                                        <div>
                                            <section className="rounded border border-solid border-orange-400 sm:mr-6">
                                                <div
                                                    className="rounded-tl rounded-tr border-b border-solid bg-orange-400 px-4 py-2">
                                                    <h2 className="text-lg font-semibold">Company Highlight</h2>
                                                </div>
                                                <ul>
                                                    <li className="border-t border-solid border-gray-200 first:border-t-0">
                                                        <div className="CardJobList block rounded border border-solid border-white bg-white p-4">
                                                            <div className="flex items-start gap-2">
                                                                <div className="w-[88px] bg-white">
                                                                    <a className="inline-block" target="_blank" href="">
                                                                        <img
                                                                            src="src/assets/img/saleCore.jpg"
                                                                            style={{ objectFit: "contain" }}
                                                                            alt=""
                                                                            loading="lazy"
                                                                            width="88"
                                                                            height="66"
                                                                            decoding="async"
                                                                            className="h-28 w-40 max-w-full rounded-xl bg-white p-2"
                                                                        />
                                                                    </a>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h3 className="line-clamp-1 text-sm font-bold md:text-lg">
                                                                        <a className="transition hover:text-primary" target="_blank" href="">
                                                                            Full-Stack Developer
                                                                        </a>
                                                                    </h3>
                                                                    <div className="line-clamp-1">
                                                                        <a
                                                                            target="_blank"
                                                                            className="text-sm text-gray-500 transition-all hover:text-primary md:text-base"
                                                                            href=""
                                                                        >
                                                                            SALESCORE
                                                                        </a>
                                                                    </div>
                                                                    <div className="mt-2 flex items-end">
                                                                        <div className="line-clamp-1">
                                                                            <a className="mr-2 inline-block" href="">
                                                                                <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm bg-blue-100 text-blue-500">
                                                                                    JavaScript
                                                                                </span>
                                                                            </a>
                                                                            <a className="mr-2 inline-block" href="">
                                                                                <span className="whitespace-nowrap rounded border text-md font-normal transition-all inline-flex items-center justify-center border-solid hover:border-blue-dark h-[1.625rem] px-2 text-xs md:h-7 md:px-2 md:text-sm bg-blue-100 text-blue-500">
                                                                                    JavaScript
                                                                                </span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
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
            </div>
        </div>
    );
}
