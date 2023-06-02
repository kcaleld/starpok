import useApi from '../../hooks/useApi';
import Film from '../../models/star-wars/film';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Alert, AlertTitle, Collapse, Divider, IconButton, LinearProgress, Pagination } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode, useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { ColorConfig } from '../../configs/colorConfigs';
import { FC } from 'react';
import { Planet } from '../../models/star-wars/planet';

type Props = {};

interface StyledTableCellProps {
    colorConfigs: ColorConfig;
    children?: ReactNode;
}

const StyledTableCell: FC<StyledTableCellProps> = ({ colorConfigs, ...rest }) => {
    const StyledTableCellWithColor = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: colorConfigs.sidebar.bg,
            color: colorConfigs.sidebar.color,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return <StyledTableCellWithColor {...rest} />;
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const PlanetsPage = (props: Props) => {
    const { appPallette } = useSelector((state: RootState) => state.appState);
    const baseUrl = process.env.REACT_APP_STAR_WARS_API_URL || "";

    const [open, setOpen] = useState(true);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    const [data, loading, error] = useApi<Planet[]>(baseUrl, `planets?page=${page}`);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}planets`);
                const data = await response.json();
                setCount(data.count);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (loading) {
        return <LinearProgress color='inherit' />;
    }

    if (error) {
        return (
            <Alert severity="error">
                <AlertTitle>Ha ocurrido un error</AlertTitle>
                {error.message}
            </Alert>
        );
    }

    return (
        <>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    variant="filled"
                    color="success"
                    sx={{ mb: 2 }}
                >
                    Se obtuvo la información con éxito
                </Alert>
            </Collapse>
            <Divider variant="middle" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size='small'>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell colorConfigs={appPallette}>Nombre</StyledTableCell>
                            <StyledTableCell colorConfigs={appPallette}>Clima</StyledTableCell>
                            <StyledTableCell colorConfigs={appPallette}>Terreno</StyledTableCell>
                            <StyledTableCell colorConfigs={appPallette}>Gravedad</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map(film => (
                            <StyledTableRow
                                key={film.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{film.name}</TableCell>
                                <TableCell>{film.climate}</TableCell>
                                <TableCell>{film.terrain}</TableCell>
                                <TableCell>{film.gravity}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={Math.ceil(count / 10)} page={page} onChange={handlePageChange} sx={{ display: 'flex', justifyContent: 'end', paddingY: '10px' }} />
        </>
    );
};

export default PlanetsPage;