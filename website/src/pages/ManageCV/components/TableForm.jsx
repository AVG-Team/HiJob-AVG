import { useState } from "react";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

function createData(id, name, statusCV, dateApply) {
    return { id, name, statusCV, dateApply };
}

const rows = [
    createData(
        1,
        "CV_Nguyen_Mai_Bao_Huy_Java_Internship",
        [
            {
                id: 1,
                position: "Web Java Developer (Spring/ Spring Boot/ J2EE)",
                name: "Hanatour Japan System Việt Nam (HJSV)",
                date: "07-06-2024 03:03:04",
                status: "Gửi hồ sơ cho Nhà tuyển dụng",
            },
        ],
        "07-06-2024 03:03:04",
    ),
    createData(
        2,
        "CV_Nguyen_Mai_Bao_Huy",
        [
            {
                id: 1,
                position: "Web Java Developer (Spring/ Spring Boot/ J2EE)",
                name: "TopDev's Client",
                date: "07-06-2024 03:03:04",
                status: "Gửi hồ sơ cho Nhà tuyển dụng",
            },
            {
                id: 2,
                position: "Web Java Developer (Spring/ Spring Boot/ J2EE)",
                name: "CÔNG TY TNHH LIKELION",
                date: "07-06-2024 03:03:04",
                status: "Gửi hồ sơ cho Nhà tuyển dụng",
            },
        ],
        "07-06-2024 03:03:04",
    ),
    createData(
        3,
        "CV_Nguyen_Mai_Bao_Huy",
        [
            {
                id: 1,
                position: "Web Java Developer (Spring/ Spring Boot/ J2EE)",
                name: "CÔNG TY TNHH LIKELION",
                date: "07-06-2024 03:03:04",
                status: "Gửi hồ sơ cho Nhà tuyển dụng",
            },
            {
                id: 2,
                name: "TẬP ĐOÀN NOVAON",
                date: "07-06-2024 03:03:04",
                status: "Gửi hồ sơ cho Nhà tuyển dụng",
            },
        ],
        "07-06-2024 03:03:04",
    ),
    createData(
        4,
        "CV_Nguyen_Mai_Bao_Huy_Thuc_tap_sinh_Java_software_engineer",
        [
            {
                id: 1,
                position: "Web Java Developer (Spring/ Spring Boot/ J2EE)",
                name: "TẬP ĐOÀN NOVAON",
                status: "Gửi hồ sơ cho Nhà tuyển dụng",
            },
            {
                id: 2,
                position: "Web Java Developer (Spring/ Spring Boot/ J2EE)",
                name: "Chubb Life Vietnam",
                status: "Gửi hồ sơ cho Nhà tuyển dụng",
            },
        ],
        "07-06-2024 03:03:04",
    ),
    createData(
        5,
        "CV_Nguyen_Mai_Bao_Huy_Thuc_tap_sinh_lap_trinh_vien_mobile",
        [
            {
                id: 1,
                position: "Web Java Developer (Spring/ Spring Boot/ J2EE)",
                name: "Chubb Life Vietnam",
                status: "Gửi hồ sơ cho Nhà tuyển dụng",
            },
        ],
        "07-06-2024 03:03:04",
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
                            <StyledTableCell align="center" sx={{ width: "20%", sm: "table-cell" }}>
                                Tên CV
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ width: "40%", display: { xs: "none", sm: "table-cell" } }}
                            >
                                Trạng Thái CV
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ width: "30%", display: { xs: "none", sm: "table-cell" } }}
                            >
                                Lần Chỉnh Sửa Gần Nhất
                            </StyledTableCell>
                            <StyledTableCell align="center" sx={{ width: "10%" }}>
                                Tuỳ Chọn
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <StyledTableRow key={row.id}>
                                <TableCell
                                    align="center"
                                    sx={{ width: "20%", color: "#ed5b2d", fontWeight: "bold", padding: 4 }}
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        width: "40%",
                                        fontWeight: "bold",
                                        padding: 4,
                                        display: { xs: "none", sm: "table-cell" },
                                    }}
                                >
                                    {row.statusCV.map((status) => {
                                        return (
                                            <div key={status.id} className="flex items-center justify-start">
                                                <div className="flex-1 py-2">
                                                    <div className="flex items-center justify-start">
                                                        <CheckCircleIcon
                                                            fontSize="small"
                                                            className="mr-2 text-green-500"
                                                        />
                                                        <div className="text-gray-700">
                                                            <span>Đã ứng tuyển vào vị trí </span>
                                                            <span className="font-semibold">{status.position}</span>
                                                            <span> tại công ty </span>
                                                            <span className="font-semibold">{status.name}</span>
                                                            <span> vào lúc </span>
                                                            <span className="text-blue-500">{status.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{ width: "30%", padding: 4, display: { xs: "none", sm: "table-cell" } }}
                                >
                                    {row.dateApply}
                                </TableCell>
                                <TableCell align="center" sx={{ width: "10%", fontWeight: "bold" }}>
                                    <div className="flex justify-center">
                                        <button className="p-2 mr-1 hover:shadow-lg hover:rounded-md">
                                            <VisibilityIcon
                                                fontSize="large"
                                                className="text-secondary hover:text-secondary-600"
                                            />
                                        </button>
                                        <button className="p-2 mr-1 hover:shadow-lg hover:rounded-md">
                                            <CloudDownloadIcon
                                                fontSize="large"
                                                className="text-secondary hover:text-secondary-600"
                                            />
                                        </button>
                                    </div>
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
