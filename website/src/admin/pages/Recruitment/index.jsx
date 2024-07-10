import React, { useEffect, useState } from 'react';
import TableData from "./components/table.jsx";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.jsx";
import recruitmentApi from "../../../services/apis/recruitmentApi.js";
import { toast } from "react-toastify";
import Filter from "./components/filter.jsx";

export default function RecruitmentIndex(props) {
    const [recruitments, setRecruitments] = useState([]);
    const [query, setQuery] = useState({
        page: 0,
        size: 10,
        q: "",
        status: "",
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
            status: urlParams.get('status') || "",
        });
    }, [title]);

    const getData = async () => {
        try {
            const response = await recruitmentApi.getRecruitmentQuery(query);
            const data = response.data.content;
            setRecruitments(data);
            setTotalResults(response.data.totalElements);
            setResultsPerPage(response.data.size);
        } catch (error) {
            console.error('Error fetching recruitments:', error);
            toast.error("Error fetching recruitments");
            setRecruitments([]);
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

    const handleChange = async (event) => {
        const value = event.target.value || '';
        const name = event.target.name;
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
                <Breadcrumb pageName="Quản Lý Tuyển Dụng" />
            </div>
            <Filter query={query} setQuery={setQuery} handleChange={handleChange}/>
            <div className="mt-4">
                {recruitments.length > 0 ? (
                    <TableData recruitments={recruitments} setRecruitments={setRecruitments} totalResults={totalResults} resultsPerPage={resultsPerPage} setQuery={setQuery} query={query}/>
                ) : (
                    <div className="mt-4">Loading....</div>
                )}
            </div>
        </>
    );
}
