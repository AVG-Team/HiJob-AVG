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
import skillApi from '../../../../services/apis/skillApi';
import Pagination from "../../../components/pagination.jsx";

export default function SkillTableData({ skills, setSkills, query, setQuery, totalResults, resultsPerPage }) {
    const handleDelete = (skillId) => async (event) => {
        event.preventDefault();
        if (!skillId) {
            console.error('Skill ID is null or undefined');
            return;
        }
        const confirmation = confirm("Bạn có chắc chắn muốn xóa kỹ năng này không?");
        if (confirmation) {
            try {
                await skillApi.deleteSkill(skillId);
                setSkills(skills.filter((skill) => skill.id !== skillId))
                toast.success("Xóa kỹ năng thành công", {
                    autoClose: 1000
                })
            } catch (error) {
                console.error("Error deleting skill:", error);
                toast.error('Xóa kỹ năng thất bại');
            }
        }
    };

    return (
        <TableContainer component={Paper} className="!py-7.5">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Kỹ năng</TableCell>
                        <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <TableRow key={skill.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{skill.skillName}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/admin/skills/edit/${skill.id}`}>
                                        <EditOutlined className="hover:text-primary" />
                                    </Link>
                                    <a href="#" onClick={handleDelete(skill.id)}>
                                        <DeleteForeverOutlined className="hover:text-red-500" />
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                Không tìm thấy kỹ năng
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination query={query} setQuery={setQuery} totalResults={totalResults} resultsPerPage={resultsPerPage} />
        </TableContainer>
    );
};
