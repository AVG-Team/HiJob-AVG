import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import companyApi  from "../../../../services/apis/companyApi.js";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import {Link} from "react-router-dom";

export default function CompanyTableData() {
    const [companies, setCompanies] = React.useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await companyApi.getCompanies();
            const data = response.data.content;
            console.log(data)
            setCompanies(data);
        } catch (error) {
            console.error('Error fetching companies:', error);
            toast.error("Error fetching companies")
            setCompanies([]);
        }
    };

    const handleDelete = async (companyId) => {
        if (!companyId) {
            console.error('Company ID is null or undefined');
            return;
        }

        if (window.confirm(`Are you sure you want to delete this company?`)) {
            try {
                await companyApi.deleteCompany(companyId);
                toast.success('Company deleted successfully');
                getData();
            } catch (error) {
                console.error('Error deleting company:', error);
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
                        <TableCell align="center">Link Google Map</TableCell>
                        <TableCell align="center">Ngày tạo</TableCell>
                        <TableCell align="center">Ngày sửa</TableCell>
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
                                <TableCell align="center">{company.linkGoogleMap}</TableCell>
                                <TableCell align="center">{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell align="center">{new Date(company.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/admin/companies/edit/${company.id}`}><EditOutlined className="hover:text-primary" /></Link>
                                    <a href="" onClick={() => handleDelete(company.id)}><DeleteForeverOutlined className="hover:text-red-500" /></a>
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
        </TableContainer>
    );
}
