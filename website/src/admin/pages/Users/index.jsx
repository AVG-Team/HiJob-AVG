import React, {useEffect, useState} from 'react';
import TableData from "./Components/table.jsx";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.jsx";
import {AddCircleOutlineOutlined, Search} from '@mui/icons-material';
import CustomInput from "../../../components/Forms/Inputs/customColor.jsx"
import {InputAdornment} from "@mui/material";
import {getAll} from "../../../services/apis/admin/users.js";
import {toast} from "react-toastify";
import Filter from "./Components/filter.jsx";
import {Link} from "react-router-dom";

export default function Index(props) {
    const [data, setData] = React.useState([]);
    const [query, setQuery] = React.useState({
        role: "",
        page: "0",
        size: "15",
        company: "",
        active: "",
        province: "",
        jobPosition: "",
        age: "",
        q: "",
    });
    const [typingTimeout, setTypingTimeout] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [prevQuery, setPrevQuery] = useState(query);

    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";

        const urlParams = new URLSearchParams(window.location.search);
        setQuery({
            role: urlParams.get('role') || "",
            q: urlParams.get('q') || "",
            page: urlParams.get('page') || "0",
            size: urlParams.get('size') || "15",
            company: urlParams.get('company') || "",
            active: urlParams.get('active') || "",
            province: urlParams.get('province') || "",
            jobPosition: urlParams.get('jobPosition') || "",
            age: urlParams.get('age') || "",
        });

        getData().then();
    }, [title]);

    const getData = async () => {
        try {
            const response = await getAll(query);
            setData(response.data.users);
            setTotalResults(response.data.totalResults);
            setResultsPerPage(response.data.resultsPerPage);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Lỗi khi tải dữ liệu");
        }
    }

    const handleChange = async (event) => {
        const value = event.target.value || '';
        const name = event.target.name;// Cập nhật query và gọi pushUrl khi value không rỗng
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        if (value !== undefined && value !== '') {
            await setQuery({ ...query, [name]: value });

            setTypingTimeout(setTimeout(() => {
                pushUrl(name, value);
            }, 1000));
        } else {
            await setQuery({ ...query, [name]: '' });

            setTypingTimeout(setTimeout(() => {
                pushUrl(name, '');
            }, 1000));
        }
    };

    useEffect(() => {
        // Kiểm tra sự thay đổi của query và đặt lại page nếu cần
        const isQueryChanged = Object.keys(query).some(key => key !== 'page' && query[key] !== prevQuery[key]);
        if (isQueryChanged) {
            setQuery(prev => ({ ...prev, page: "0" }));
        } else {
            getData();
        }
        setPrevQuery(query);
    }, [query]);

    const pushUrl = (key, value) => {
        const newSearchParams = new URLSearchParams(window.location.search);
        if (value) {
            newSearchParams.set(key, value);
        } else {
            newSearchParams.delete(key);
        }

        const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
    };

    return (
        <>
            <div>
                <Breadcrumb pageName="Quản Lý Người Dùng"/>
            </div>
            <div className="mt-4 sm:flex sm:justify-between flex-row-reverse">
                <Link className="flex group cursor-pointer mb-4 sm:mb-0" to="/admin/users/create">
                    <AddCircleOutlineOutlined className="group-hover:text-primary"/>
                    <p className="ml-2 group-hover:text-primary">Thêm Người Dùng</p>
                </Link>
                <div>
                    <CustomInput
                        id="standard-basic"
                        type="text"
                        placeholder="Type to search..."
                        className="!w-full"
                        name="q"
                        value={query.q}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </div>
            <Filter query={query} setQuery={setQuery} handleChange={handleChange}/>
            <div className="mt-4 md:mt-6 2xl:mt-7.5">
                <TableData data={data} setData={setData} role={query.role} query={query} setQuery={setQuery} resultsPerPage={resultsPerPage} totalResults={totalResults}/>
            </div>
        </>
    );
}
