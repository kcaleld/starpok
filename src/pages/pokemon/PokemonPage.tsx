import useApi from '../../hooks/useApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Alert, AlertTitle, Box, CircularProgress, Collapse, Divider, IconButton, LinearProgress, Pagination, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { ColorConfig } from '../../configs/colorConfigs';
import { FC } from 'react';
import { Pokemon } from '../../models/pokemon/pokemon';
import { KeyboardArrowUp, KeyboardArrowDown, Settings } from '@mui/icons-material';
import { PokemonDetail } from '../../models/pokemon/pokemonDetail';

type Props = {};

interface StyledTableCellProps {
    colorConfigs: ColorConfig;
    width: string;
    children?: ReactNode;
}

const StyledTableCell: FC<StyledTableCellProps> = ({ colorConfigs, width, ...rest }) => {
    const StyledTableCellWithColor = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: colorConfigs.sidebar.bg,
            color: colorConfigs.sidebar.color,
            width: width
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


const PokemonsPage = (_props: Props) => {
    const { appPallette } = useSelector((state: RootState) => state.appState);
    const baseUrl = process.env.REACT_APP_POKEMON_API_URL || "";

    const [open, setOpen] = useState(true);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(null);
    const [imageLoading, setImageLoading] = useState(false);

    const [pokemonsData, pokemonsLoading, pokemonsError] = useApi<Pokemon[]>(baseUrl, `pokemon?limit=10&offset=${(page - 1) * 10}`);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}pokemon`);
                const data = await response.json();
                setCount(data.count);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setImageLoading(false);
    }, [pokemonDetails]);


    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleRowClick = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        const pokemon: PokemonDetail = {
            id: data.id,
            name: data.name,
            types: data.types.map((type: { type: { name: string } }) => type.type.name),
            abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
            stats: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                specialAttack: data.stats[3].base_stat,
                specialDefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
            },
            height: data.height,
            weight: data.weight,
            image: data.sprites.front_default,
        };

        setImageLoading(true);
        setPokemonDetails(pokemon);
        setExpandedRow(url);
    };

    if (pokemonsLoading) {
        return <LinearProgress color='inherit' />;
    }

    if (pokemonsError) {
        return (
            <Alert severity="error">
                <AlertTitle>Ha ocurrido un error</AlertTitle>
                {pokemonsError.message}
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
                            <StyledTableCell colorConfigs={appPallette} width="90%">Nombre</StyledTableCell>
                            <StyledTableCell colorConfigs={appPallette} width="10%"><Settings /></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {pokemonsData?.map((pokemon) => (
                            <Fragment key={pokemon.name}>
                                <TableRow hover onClick={() => handleRowClick(pokemon.url)}>
                                    <TableCell component="th" scope="row" width={90}>
                                        {pokemon.name}
                                    </TableCell>
                                    <TableCell width={10}>
                                        <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(pokemon.url)}>
                                            {expandedRow === pokemon.url ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={expandedRow === pokemon.url} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                <Table size="small" aria-label="purchases">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>Tipos</TableCell>
                                                            <TableCell>{pokemonDetails?.types.map((type) => type).join(', ')}</TableCell>
                                                            <TableCell rowSpan={2} align="center">
                                                                {imageLoading ? (
                                                                    <CircularProgress />
                                                                ) : (
                                                                    <img src={pokemonDetails?.image} alt={pokemon.name} />
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>Habilidades</TableCell>
                                                            <TableCell>{pokemonDetails?.abilities.map((ability) => ability).join(', ')}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={Math.ceil(count / 10)} page={page} onChange={handlePageChange} sx={{ display: 'flex', justifyContent: 'end', paddingY: '10px' }} />
        </>
    );
};

export default PokemonsPage;