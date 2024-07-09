import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {getAll} from "../../../../services/apis/admin/users.js";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {EditOutlined, DeleteForeverOutlined} from '@mui/icons-material';

export default function TableData() {
    const [data, setData] = React.useState([]);
    const [role, setRole] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState("1");
    const [totalPage, setTotalPage] = React.useState(15);
    const [company, setCompany] = React.useState("");
    const [active, setActive] = React.useState("1");
    const [jobStatus, setJobStatus] = React.useState("");
    const [province, setProvince] = React.useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        //search filter
        setRole(urlParams.get('role'));
        setSearch(urlParams.get('search'));
        setPage(urlParams.get('page'));
        setCompany(urlParams.get('company'));
        setActive(urlParams.get('active'));
        setJobStatus(urlParams.get('jobStatus'));
        setProvince(urlParams.get('province'));
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await getAll();
            const data = response.data;
            setData(data);
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TableContainer component={Paper} className="!py-7.5">
            <h4 className="mb-6 text-xl font-semibold px-7.5">
                Top Channels
            </h4>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Tên Đầy Đủ</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Tuổi</TableCell>
                        <TableCell align="center">Tỉnh Thành</TableCell>
                        {role !== "employee" && (
                            <TableCell align="center">Vị Trí Công Việc</TableCell>
                        )}
                        {role !== "users" && (
                            <TableCell align="center">Công Ty</TableCell>
                        )}
                        <TableCell align="center">Chức Vụ</TableCell>
                        <TableCell align="center">Hành Động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((each, index) => (
                        <TableRow
                            key={each.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="center">{each.fullName}</TableCell>
                            <TableCell align="center">{each.email}</TableCell>
                            <TableCell
                                align="center">{each.birthday === null ? "" : new Date().getFullYear() - new Date(each.birthday).getFullYear()}</TableCell>
                            <TableCell align="center">{each.province}</TableCell>
                            <TableCell align="center">{each.jobPosition}</TableCell>
                            <TableCell align="center">{each.company}</TableCell>
                            <TableCell align="center">{each.role}</TableCell>
                            <TableCell align="center">

                                <a href=""><EditOutlined className="hover:text-primary"/></a>
                                <a href=""><DeleteForeverOutlined className="hover:text-red-500"/></a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
