import React, {useEffect} from 'react';
import TableData from "./Components/table.jsx";
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
                <Breadcrumb pageName="Quản Lý Người Dùng"/>
            </div>
            <div className="mt-4"></div>
            <div className="mt-4 md:mt-6 2xl:mt-7.5">
                <TableData />
            </div>
        </>
    );
}
