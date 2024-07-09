import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TableData from "./components/table.jsx";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb.jsx";

export default function Index(props) {
    const [rows, setRows] = React.useState([]);

    const title = props.title;
    useEffect(() => {
        document.title = title ? `${title}` : "Trang không tồn tại";
    }, [title]);

    return (
        <>
            <div>
                <Breadcrumb pageName="Quản Lý Công Việc" />
            </div>
            <div className="mt-4"></div>
            <div className="mt-4">
                <TableData />
            </div>
        </>
    );
}