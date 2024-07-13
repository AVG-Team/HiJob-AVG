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
import levelApi from '../../../../services/apis/levelApi';
import Pagination from '../../../components/pagination.jsx';

export default function LevelTableData ({ levels, setLevels, query, setQuery, totalResults, resultsPerPage }) {
    const handleDelete = (levelId) => async (event) => {
        event.preventDefault();
        if (!levelId) {
            console.error('Level ID is null or undefined');
            return;
        }
        const confirmation = window.confirm('Bạn có chắc chắn muốn xóa level này không?');
        if (confirmation) {
            try {
                await levelApi.deleteLevel(levelId);
                setLevels(levels.filter((level) => level.id !== levelId));
                toast.success('Xóa level thành công', { autoClose: 1000 });
            } catch (error) {
                console.error('Error deleting level:', error);
                toast.error('Xóa level thất bại');
            }
        }
    };

    return (
        <TableContainer component={Paper} className="!py-7.5">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Level</TableCell>
                        <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {levels.length > 0 ? (
                        levels.map((level, index) => (
                            <TableRow key={level.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{level.levelName}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/admin/levels/edit/${level.id}`}>
                                        <EditOutlined className="hover:text-primary" />
                                    </Link>
                                    <a href="#" onClick={handleDelete(level.id)}>
                                        <DeleteForeverOutlined className="hover:text-red-500" />
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                Không tìm thấy
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination query={query} setQuery={setQuery} totalResults={totalResults} resultsPerPage={resultsPerPage} />
        </TableContainer>
    );
};