import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { profile, getUser } from "../../../services/apis/profile.js";
import recruitmentApi from "../../../services/apis/recruitmentApi";
import jobApi from "../../../services/apis/jobApi";
import companyApi from "../../../services/apis/companyApi";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#4cc2ff",
        color: theme.palette.common.white,
        fontWeight: "bold",
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function TableForm() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [applyJob, setApplyJob] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProfile = await profile();
                const responseUser = await getUser(responseProfile.data.email);

                const responseJobApplied = await recruitmentApi.getRecruitmentByUserId(responseUser.data.id);
                const jobIds = responseJobApplied.data;
                console.log(jobIds);
                let idCounter = 1;
                const jobDetailsPromises = jobIds.map(async (job) => {
                    const jobDetail = await jobApi.getJobById(job.jobId);
                    const companyDetail = await companyApi.getCompanyById(jobDetail.data.companyId);

                    return {
                        id: idCounter++,
                        jobName: jobDetail.data.title,
                        companyName: companyDetail.data.name,
                        appliedDay: job.appliedAt,
                        status: job.status, // Adjust according to your API response
                    };
                });

                const jobDetails = await Promise.all(jobDetailsPromises);
                setApplyJob(jobDetails);
            } catch (error) {
                console.log("Failed to fetch data: ", error);
            }
        };
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350, fontSize: 16, overflow: "hidden" }}>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell
                                align="center"
                                sx={{ width: 50, display: { xs: "none", sm: "table-cell" } }}
                            >
                                ID
                            </StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: 250 }}>
                                Tên vị trí
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ width: 200, display: { xs: "none", sm: "table-cell" } }}
                            >
                                Tên công ty
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ width: 150, display: { xs: "none", sm: "table-cell" } }}
                            >
                                Ngày ứng tuyển
                            </StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: 200 }}>
                                Trạng thái gần nhất
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {applyJob.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <StyledTableRow key={row.id}>
                                <TableCell
                                    align="center"
                                    sx={{ width: 50, padding: 4, display: { xs: "none", sm: "table-cell" } }}
                                >
                                    {row.id}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ width: 250, color: "#ed5b2d", fontWeight: "bold", padding: 4 }}
                                >
                                    {row.jobName}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        width: 200,
                                        fontWeight: "bold",
                                        padding: 4,
                                        display: { xs: "none", sm: "table-cell" },
                                    }}
                                >
                                    {row.companyName}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ width: 150, padding: 4, display: { xs: "none", sm: "table-cell" } }}
                                >
                                    {row.appliedDay}
                                </TableCell>
                                <TableCell align="center" sx={{ width: 200, fontWeight: "bold" }}>
                                    {row.status == 0 ? "Đã ứng tuyển" : "Đã nhận việc"}
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={applyJob.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
