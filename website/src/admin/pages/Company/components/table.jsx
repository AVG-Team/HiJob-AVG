import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import companyApi  from "../../../../services/apis/companyApi.js";
import { toast } from 'react-toastify';
import {useEffect, useState} from "react";
import { EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import {Link} from "react-router-dom";
import {deleteUser} from "../../../../services/apis/admin/users.js";
import Pagination from "../../../components/pagination.jsx";

export default function CompanyTableData({companies, setCompanies, query, setQuery, totalResults, resultsPerPage}) {
    const handleDelete = (companyId) => async (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
        if (!companyId) {
            console.error('Company ID is null or undefined');
            return;
        }
        const confirmation = confirm("Bạn có chắc chắn muốn xóa công ty này không?");
        if (confirmation) {
            try {
                await companyApi.deleteCompany(companyId);
                setCompanies(companies.filter((company) => company.id !== companyId))
                toast.success("Xóa người dùng thành công", {
                    autoClose: 1000
                })
            } catch (error) {
                console.error("Error deleting user:", error);
                toast.error('Failed to delete company');
            }
        }
    };

    return (
        <TableContainer component={Paper} className="!py-7.5">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Tên</TableCell>
                        <TableCell align="center">Mã thuế</TableCell>
                        <TableCell align="center">Lĩnh vực</TableCell>
                        <TableCell align="center">Địa chỉ</TableCell>
                        <TableCell align="center">Tỉnh</TableCell>
                        <TableCell align="center">Chứng nhận đăng ký</TableCell>
                        <TableCell align="center">Người tuyển dụng</TableCell>
                        <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.length > 0 ? (
                        companies.map((company, index) => (
                            <TableRow key={company.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{company.name}</TableCell>
                                <TableCell align="center">{company.taxCode}</TableCell>
                                <TableCell align="center">{company.field}</TableCell>
                                <TableCell align="center">{company.address}</TableCell>
                                <TableCell align="center">{company.province}</TableCell>
                                <TableCell align="center">{company.registration_certificate}</TableCell>
                                <TableCell align="center">{company.employer_name}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/admin/companies/edit/${company.id}`}><EditOutlined className="hover:text-primary" /></Link>
                                    <a href="" onClick={handleDelete(company.id)}><DeleteForeverOutlined className="hover:text-red-500" /></a>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={13} align="center">No companies found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination query={query} setQuery={setQuery} totalResults={totalResults} resultsPerPage={resultsPerPage}/>
        </TableContainer>
    );
}
