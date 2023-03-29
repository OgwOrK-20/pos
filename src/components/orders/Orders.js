import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { v4 } from 'uuid'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(v4(), "23/03/2023 15:28", "Paid", "Jerry", 12),
    createData(v4(), "23/03/2023 15:38", "Paid", "Luke", 23),
    createData(v4(), "23/03/2023 16:28", "Paid", "Unnamed", 44),
    createData(v4(), "24/03/2023 19:23", "Paid", "Unnamed", 52),
    createData(v4(), "25/03/2023 19:52", "Paid", "Unnamed", 17),
    createData(v4(), "23/03/2023 15:28", "Paid", "Jerry", 12),
    createData(v4(), "23/03/2023 15:38", "Paid", "Luke", 23),
    createData(v4(), "23/03/2023 16:28", "Paid", "Unnamed", 44),
    createData(v4(), "24/03/2023 19:23", "Canceled", "Unnamed", 52),
    createData(v4(), "25/03/2023 19:52", "Paid", "Unnamed", 17),
    createData(v4(), "23/03/2023 15:28", "Paid", "Jerry", 12),
    createData(v4(), "23/03/2023 15:38", "Paid", "Luke", 23),
    createData(v4(), "23/03/2023 16:28", "Paid", "Unnamed", 44),
    createData(v4(), "24/03/2023 19:23", "Paid", "Unnamed", 52),
    createData(v4(), "25/03/2023 19:52", "Paid", "Unnamed", 17),
];



function Orders() {
    return (
        <React.Fragment>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={320}>Invoice</TableCell>
                            <TableCell align='center'>Date and time</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell align='center'>Customer</TableCell>
                            <TableCell align='center'>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align='center'>{row.calories}</TableCell>
                                <TableCell align='center'>{row.fat}</TableCell>
                                <TableCell align='center'>{row.carbs}</TableCell>
                                <TableCell align='center'>{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default Orders