import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';



export default function TableCustom({list = [], onEdit}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Descripción</TableCell>
                        <TableCell align="center">Inicio</TableCell>
                        <TableCell align="center">Finalización</TableCell>
                        <TableCell align="center">Creada</TableCell>
                        <TableCell align="center">Prioridad</TableCell>
                        <TableCell align="center">Estado</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">{row.beginDate}</TableCell>
                            <TableCell align="center">{row.endDate}</TableCell>
                            <TableCell align="center">{row.createdAt}</TableCell>
                            <TableCell align="center">{row.priority.name}</TableCell>
                            <TableCell align="center">{row.status.name}</TableCell>
                            <TableCell align="center">
                                <IconButton onClick={ () => onEdit(row)} size="large" aria-label="show 4 new mails" color="inherit">
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}