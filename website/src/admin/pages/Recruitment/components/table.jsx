import React from 'react';
import { TableCell, TableContainer, TableHead, TableRow, TableBody, Table } from '@mui/material';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import { DeleteForeverOutlined } from '@mui/icons-material';
import recruitmentApi from "../../../../services/apis/recruitmentApi.js";
import Pagination from "../../../components/pagination.jsx";

export default function RecruitmentTableData({ recruitments, setRecruitments, query, totalResults, resultsPerPage }) {
    const handleDelete = (recruitmentId) => async (event) => {
        event.preventDefault();
        if (!recruitmentId) {
            console.error('Recruitment ID is null or undefined');
            return;
        }
        const confirmation = confirm("Bạn có chắc chắn muốn xóa tuyển dụng này không?");
        if (confirmation) {
            try {
                await recruitmentApi.deleteRecruitment(recruitmentId);
                setRecruitments(recruitments.filter((recruitment) => recruitment.id !== recruitmentId));
                toast.success("Xóa tuyển dụng thành công", {
                    autoClose: 1000
                });
            } catch (error) {
                console.error("Error deleting recruitment:", error);
                toast.error('Failed to delete recruitment');
            }
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return 'Đã được duyệt';
            case 0:
                return 'Đang chờ';
            case -1:
                return 'Từ chối';
            default:
                return '';
        }
    };

    const filteredRecruitments = recruitments.filter(recruitment => {
        if (query.status !== "") {
            return recruitment.status.toString() === query.status;
        }
        return true;
    });

    return (
        <TableContainer component={Paper} className="!py-7.5">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Người dùng</TableCell>
                        <TableCell align="center">Công việc</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                        <TableCell align="center">CV</TableCell>
                        <TableCell align="center">Thư xin việc</TableCell>
                        <TableCell align="center">Ngày ứng tuyển</TableCell>
                        <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRecruitments.length > 0 ? (
                        filteredRecruitments.map((recruitment, index) => (
                            <TableRow key={recruitment.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{recruitment.user_name}</TableCell>
                                <TableCell align="center">{recruitment.job_name}</TableCell>
                                <TableCell align="center">{getStatusText(recruitment.status)}</TableCell>
                                <TableCell align="center">{recruitment.cv}</TableCell>
                                <TableCell align="center">{recruitment.coverLetter}</TableCell>
                                <TableCell align="center">{new Date(recruitment.appliedAt).toLocaleString()}</TableCell>
                                <TableCell align="center">
                                    <a href="" onClick={handleDelete(recruitment.id)}><DeleteForeverOutlined className="hover:text-red-500" /></a>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} align="center">No recruitments found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination query={query} totalResults={totalResults} resultsPerPage={resultsPerPage} />
        </TableContainer>
    );
}