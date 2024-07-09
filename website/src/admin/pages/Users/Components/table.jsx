import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import Pagination from "./pagination.jsx";
import {deleteUser} from "../../../../services/apis/admin/users.js";
import {toast} from "react-toastify";

export default function TableData({data, setData, role, query, setQuery, totalResults, resultsPerPage}) {
    const handleDelete = (id) => async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
        const confirmation = confirm("Bạn có chắc chắn muốn xóa người dùng này không?");
        if (confirmation) {
            try {
                await deleteUser(id);
                setData(data.filter(each => each.id !== id));
                toast.success("Xóa người dùng thành công")
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <TableContainer component={Paper} className="!py-7.5">
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
                    {data?.map((each, index) => (
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
                                <a href={`/admin/users/${each.id}`}><EditOutlined className="hover:text-primary"/></a>
                                <a href="#" onClick={handleDelete(each.id)}><DeleteForeverOutlined className="hover:text-red-500"/></a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination query={query} setQuery={setQuery} totalResults={totalResults} resultsPerPage={resultsPerPage}/>
        </TableContainer>
    );
}
