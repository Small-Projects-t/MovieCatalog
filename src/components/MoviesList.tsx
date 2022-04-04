import React, {useEffect, useState} from "react";
import {Grid, IconButton, Table, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import TableBody from '@mui/material/TableBody';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useDispatch, useSelector} from 'react-redux'
import {fetchMovies} from "../redux/reducers/moviesReducer";
import {AddEditMovie} from "./AddEditMovie";
import useStyles from '../styles/MovieList.style';

interface Data {
    name: string;
    country: any;
}

interface HeadCell {
    id: keyof Data;
    label?: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'country',
        label: 'Country',
    },
];


export const MovieList = () => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [movieToEdit, setMovieToEdit] = useState<object>({});
    const classes = useStyles();

    const allMovies = useSelector((state: any) => state.movies);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies);
    }, []);

    const EnhancedTableHead = () => {
        const addButton = (
            <IconButton onClick={() => setIsAdding(true)}>
                <AddCircleIcon color="inherit"/>
            </IconButton>
        );
        return (
            <TableHead className={classes.headerContainer}>
                <TableRow>
                    <TableCell padding="none" align={'left'}>
                        {addButton}
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={'left'}
                            padding={'none'}
                        >
                            <Typography>  {headCell.label}</Typography>

                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }
    const EditButton = (movieObj: any) => {
        return (
            <IconButton onClick={() => {
                setIsEditing(!isEditing)
                setMovieToEdit(movieObj)
            }}>
                <EditIcon color="inherit"/>
            </IconButton>
        );
    }

    return (
        <Grid container item xs={12} className={classes.contentContainer}>
            {isEditing || isAdding ? (
                <AddEditMovie setIsEditing={setIsEditing} setIsAdding={setIsAdding} movieToEdit={movieToEdit}
                              isAdding={isAdding} />) : (

                <TableContainer className={classes.tableContainer}>
                    <Grid container item>
                        <Grid container item>
                            <Typography variant="h4" className={classes.headerText}>Movies</Typography>
                        </Grid>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            className={classes.table}
                        >
                            <EnhancedTableHead/>
                            <TableBody>
                                {
                                    allMovies.map((movie: any) => {

                                        return (
                                            <TableRow
                                                hover
                                                role="list"
                                                tabIndex={-1}
                                                key={movie.uuid}
                                            >
                                                <TableCell padding="none">
                                                    <EditButton movieObj={movie}/>
                                                </TableCell>
                                                <TableCell padding="none" align="left">{movie.name}</TableCell>
                                                <TableCell padding="none" align="left">{movie.country.name}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                </TableContainer>)}
        </Grid>
    )
}
