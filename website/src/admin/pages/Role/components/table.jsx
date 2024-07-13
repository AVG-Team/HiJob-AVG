import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import roleApi from '../../../../services/apis/roleApi';
import Pagination from "../../../components/pagination.jsx";

export default function RoleTableData({ roles, setRoles, query, setQuery, totalResults, resultsPerPage }) {

    return (
        <TableContainer component={Paper} className="!py-7.5">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Vai Trò</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {roles.length > 0 ? (
                        roles.map((role, index) => (
                            <TableRow key={role.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{role.name}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                Không tìm thấy vai trò
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination query={query} setQuery={setQuery} totalResults={totalResults} resultsPerPage={resultsPerPage} />
        </TableContainer>
    );
}
