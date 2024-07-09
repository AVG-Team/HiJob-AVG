import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import jobApi from '../../../../services/apis/jobApi';

export default function JobTableData() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await jobApi.getAllJobs();
            const data = response.data.content;
            console.log('Jobs data:', data);
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            toast.error('Error fetching jobs');
            setJobs([]);
        }
    };

    const handleDelete = async (jobId) => {
        if (!jobId) {
            console.error('Job ID is null or undefined');
            return;
        }

        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await jobApi.deleteJob(jobId);
                toast.success('Job deleted successfully');
                getData();
            } catch (error) {
                console.error('Error deleting job:', error);
                toast.error('Failed to delete job');
            }
        }
    };

    return (
        <TableContainer component={Paper} className="!py-7.5">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Responsibilities</TableCell>
                        <TableCell align="center">Requirements</TableCell>
                        <TableCell align="center">Benefits</TableCell>
                        <TableCell align="center">Required Years of Experience</TableCell>
                        <TableCell align="center">Salary</TableCell>
                        <TableCell align="center">Company</TableCell>
                        <TableCell align="center">Created At</TableCell>
                        <TableCell align="center">Updated At</TableCell>
                        <TableCell align="center">Actions</TableCell>
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
                                <TableCell align="center">{job.responsibilities}</TableCell>
                                <TableCell align="center">{job.requirements}</TableCell>
                                <TableCell align="center">{job.benefits}</TableCell>
                                <TableCell align="center">{job.requireOfYear}</TableCell>
                                <TableCell align="center">{job.salary}</TableCell>
                                <TableCell align="center">{job.company ? job.companyId : 'N/A'}</TableCell>
                                <TableCell align="center">{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell align="center">{new Date(job.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/admin/jobs/edit/${job.id}`}>
                                        <EditOutlined className="hover:text-primary" />
                                    </Link>
                                    <a href="#" onClick={() => handleDelete(job.id)}>
                                        <DeleteForeverOutlined className="hover:text-red-500" />
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={12} align="center">
                                No jobs found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
