import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({data}) {

    return (
        <TableContainer component={Paper} className="!py-7.5">
            <h4 className="mb-6 text-xl font-semibold px-7.5">
                Top 5 Công Ty Nhiều Theo Dõi Nhất
            </h4>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Tên công ty</TableCell>
                        <TableCell align="center">Số lượng theo dõi</TableCell>
                        <TableCell align="center">Lĩnh Vực</TableCell>
                        <TableCell align="center">Người Tuyển Dụng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((each, index) => (
                        <TableRow
                            key={each.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="center">{each.name}</TableCell>
                            <TableCell align="center">{each.follow}</TableCell>
                            <TableCell align="center">{each.field}</TableCell>
                            <TableCell align="center">{each.employer_name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
