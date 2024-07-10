import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableData from "./components/table.jsx";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.jsx";
import { toast } from "react-toastify";
import skillsApi from "../../../services/apis/skillApi.js";
import Filter from "../Skill/components/filter.jsx";

export default function Index(props) {
    const [skills, setSkills] = useState([]);
    const [query, setQuery] = useState({
        page: 0,
        size: 10,
        q: "",
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
        });
    }, [title]);

    const getData = async () => {
        try {
            const response = await skillsApi.getAllSkill(query);
            const data = response.data.content;
            setSkills(data);
            setTotalResults(response.data.totalElements);
            setResultsPerPage(response.data.size);
        } catch (error) {
            console.error('Error fetching skills:', error);
            toast.error("Error fetching skills");
            setSkills([]);
        }
    };

    useEffect(() => {
        const isQueryChanged = Object.keys(query).some(key => key !== 'page' && query[key] !== prevQuery[key]);
        if (isQueryChanged) {
            setQuery(prev => ({ ...prev, page: 0 }));
        } else {
            getData();
        }
        setPrevQuery(query);
    }, [query]);

    const navigate = useNavigate();

    const handleCreateNew = () => {
        navigate('/admin/skills/create');
    };

    const handleChange = (event) => {
        const value = event.target.value || '';
        const name = event.target.name;
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        if (value !== undefined && value !== '') {
            setQuery(prev => ({ ...prev, [name]: value }));
            setTypingTimeout(setTimeout(() => {
                pushUrl(name, value);
            }, 1000));
        } else {
            setQuery(prev => ({ ...prev, [name]: '' }));
            setTypingTimeout(setTimeout(() => {
                pushUrl(name, '');
            }, 1000));
        }
    };

    return (
        <>
            <div>
                <Breadcrumb pageName="Quản Lý Kỹ Năng" />
            </div>
            <div className="flex justify-between items-center">
                <Filter query={query} setQuery={setQuery} handleChange={handleChange}/>
                <button
                    className="bg-blue-500 text-white py-2 px-6 rounded"
                    onClick={handleCreateNew}
                >
                    Thêm
                </button>
            </div>
            <div className="mt-4">
                {skills.length > 0 ? (
                    <TableData skills={skills} setSkills={setSkills} totalResults={totalResults}
                               resultsPerPage={resultsPerPage} setQuery={setQuery} query={query} />
                ) : (
                    <div className="mt-4">Loading....</div>
                )}
            </div>
        </>
    );
}
