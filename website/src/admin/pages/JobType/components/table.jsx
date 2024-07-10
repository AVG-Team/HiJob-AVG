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
import jobTypeApi from '../../../../services/apis/jobTypeApi';
import Pagination from "../../../components/pagination.jsx";

export default function JobTypeTableData({ jobTypes, setJobTypes, query, setQuery, totalResults, resultsPerPage }) {
    const handleDelete = (jobTypeId) => async (event) => {
        event.preventDefault();
        if (!jobTypeId) {
            console.error('JobType ID is null or undefined');
            return;
        }
        const confirmation = confirm("Bạn có chắc chắn muốn xóa loại công việc này không?");
        if (confirmation) {
            try {
                await jobTypeApi.deleteJobType(jobTypeId);
                setJobTypes(jobTypes.filter((jobType) => jobType.id !== jobTypeId));
                toast.success("Xóa loại công việc thành công", {
                    autoClose: 1000
                });
            } catch (error) {
                console.error("Error deleting job type:", error);
                toast.error('Xóa loại công việc thất bại');
            }
        }
    };

    return (
        <TableContainer component={Paper} className="!py-7.5">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Loại công việc</TableCell>
                        <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobTypes.length > 0 ? (
                        jobTypes.map((jobType, index) => (
                            <TableRow key={jobType.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{jobType.typeName}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/admin/job-types/edit/${jobType.id}`}>
                                        <EditOutlined className="hover:text-primary" />
                                    </Link>
                                    <a href="#" onClick={handleDelete(jobType.id)}>
                                        <DeleteForeverOutlined className="hover:text-red-500" />
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                Không tìm thấy loại công việc
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination query={query} setQuery={setQuery} totalResults={totalResults} resultsPerPage={resultsPerPage} />
        </TableContainer>
    );
}
