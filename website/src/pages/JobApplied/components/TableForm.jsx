import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

function createData(id, name, nameCompany, dateApply, status) {
    return { id, name, nameCompany, dateApply, status };
}

const rows = [
    createData(
        1,
        "Web Java Developer (Spring/ Spring Boot/ J2EE)",
        "Hanatour Japan System Việt Nam (HJSV)",
        "07-06-2024 03:03:04",
        "Gửi hồ sơ cho Nhà tuyển dụng",
    ),
    createData(
        2,
        "Mobile Developer (iOS/Android - All Levels)",
        "TopDev's Client",
        "07-06-2024 03:03:04",
        "Gửi hồ sơ cho Nhà tuyển dụng",
    ),
    createData(
        3,
        "CƠ HỘI ĐÀO TẠO MIỄN PHÍ VÀ LÀM VIỆC TẠI HÀN QUỐC CHO CÁC BẠN FRESHER (5 tháng đào tạo + cấp visa Kỹ sư E-7)",
        "CÔNG TY TNHH LIKELION",
        "07-06-2024 03:03:04",
        "Gửi hồ sơ cho Nhà tuyển dụng",
    ),
    createData(4, "Tech Intern", "TẬP ĐOÀN NOVAON", "07-06-2024 03:03:04", "Gửi hồ sơ cho Nhà tuyển dụng"),
    createData(
        5,
        "Java Software Engineer",
        "Chubb Life Vietnam",
        "07-06-2024 03:03:04",
        "Gửi hồ sơ cho Nhà tuyển dụng",
    ),
    createData(
        6,
        "Web Developer (PHP/ Laravel)",
        "TopDev's Client",
        "07-06-2024 03:03:04",
        "Gửi hồ sơ cho Nhà tuyển dụng",
    ),
];

export default function TableForm() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                                    {row.name}
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
                                    {row.nameCompany}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ width: 150, padding: 4, display: { xs: "none", sm: "table-cell" } }}
                                >
                                    {row.dateApply}
                                </TableCell>
                                <TableCell align="center" sx={{ width: 200, fontWeight: "bold" }}>
                                    {row.status}
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
