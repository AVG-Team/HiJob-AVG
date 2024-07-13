import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import TableData from "./components/table.jsx";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.jsx";
import companyApi from "../../../services/apis/companyApi.js";
import {toast} from "react-toastify";
import Filter from "./components/filter.jsx";

export default function Index(props) {
    const [companies, setCompanies] = useState([]);
    const [query, setQuery] = useState({
        page: 0,
        size: 10,
        q: "",
        province: "",
    });
    const [totalResults, setTotalResults] = useState(0);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [prevQuery, setPrevQuery] = useState(query);
    const [typingTimeout, setTypingTimeout] = useState(0);

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

    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";
        const urlParams = new URLSearchParams(window.location.search);
        setQuery({
            q: urlParams.get('q') || "",
            page: urlParams.get('page') || 0,
            size: urlParams.get('size') || 10,
            province: urlParams.get('province') || "",
        });
    }, [title]);

    const getData = async () => {
        try {
            const response = await companyApi.getCompaniesQuery(query);
            const data = response.data.content;
            setCompanies(data);
            console.log(response)
            setTotalResults(response.data.totalElements);
            setResultsPerPage(response.data.size);
        } catch (error) {
            console.error('Error fetching companies:', error);
            toast.error("Error fetching companies")
            setCompanies([]);
        }
    };

    useEffect(() => {
        const isQueryChanged = Object.keys(query).some(key => key !== 'page' && query[key] !== prevQuery[key]);
        if (isQueryChanged) {
            setQuery(prev => ({ ...prev, page: "0" }));
        } else {
            getData().then();
        }
        setPrevQuery(query);
    }, [query]);

    const navigate = useNavigate();

    const handleCreateNew = () => {
        navigate('/admin/companies/create');
    };

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

    return (
        <>
            <div>
                <Breadcrumb pageName="Quản Lý Công Ty" />
            </div>
            <Filter query={query} setQuery={setQuery} handleChange={handleChange}/>
            <div className="mt-4">
                {companies.length > 0 ? (
                    <TableData companies={companies} setCompanies={setCompanies} totalResults={totalResults} resultsPerPage={resultsPerPage} setQuery={setQuery} query={query}/>
                ) : (
                    <div className="mt-4">Loading....</div>
                )}
            </div>
        </>
    );
}
