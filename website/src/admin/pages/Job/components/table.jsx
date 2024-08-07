import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import jobApi from '../../../../services/apis/jobApi';
import Pagination from '../../../components/pagination.jsx';

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'm'; // Chuyển đổi sang triệu
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k'; // Chuyển đổi sang nghìn
    }
    return num; // Nếu số nhỏ hơn 1000, giữ nguyên
}
export default function JobTableData({jobs, setJobs, query, setQuery, totalResults, resultsPerPage }) {
    const handleDelete = (jobId) => async (event) => {
        event.preventDefault();
        if (!jobId) {
            console.error('Job ID is null or undefined');
            return;
        }
        const confirmation = confirm("Bạn có chắc chắn muốn xóa công việc này không?");
        if (confirmation) {
            try {
                await jobApi.deleteJob(jobId);
                setJobs(jobs.filter((job) => job.id !== jobId))
                toast.success("Xóa công việc thành công", {
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
                        <TableCell align="center">Tiêu đề</TableCell>
                        <TableCell align="center">Yêu cầu</TableCell>
                        <TableCell align="center">Số năm KN</TableCell>
                        <TableCell align="center">Lương</TableCell>
                        <TableCell align="center">Công ty</TableCell>
                        <TableCell align="center">Nhà Tuyển Dụng</TableCell>
                        <TableCell align="center">Ngày tạo</TableCell>
                        <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.length > 0 ? (
                        jobs.map((job, index) => (
                            <TableRow key={job.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{job.title}</TableCell>
                                <TableCell align="center">{job.requirements}</TableCell>
                                <TableCell align="center">{job.requireOfYear}</TableCell>
                                <TableCell align="center">{formatNumber(job.salary)}</TableCell>
                                <TableCell align="center">{job.companyName}</TableCell>
                                <TableCell align="center">{job.userName}</TableCell>
                                <TableCell align="center">{new Date(job.createdAt).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/admin/jobs/edit/${job.id}`}>
                                        <EditOutlined className="hover:text-primary" />
                                    </Link>
                                    <a href="" onClick={handleDelete(job.id)}>
                                        <DeleteForeverOutlined className="hover:text-red-500" />
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={11} align="center">No jobs found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination query={query} setQuery={setQuery} totalResults={totalResults} resultsPerPage={resultsPerPage} />
        </TableContainer>
    );
}