import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import {Grid} from '@material-ui/core';
import {Autocomplete, IconButton, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCountries} from "../redux/countryReducer";
import {addMovie, editMovie} from "../redux/moviesReducer";
import useStyles from '../styles/AddEditMovie.style';
import MovieCatalogServices from "../services/MovieCatalogServices";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

/*import MovieCatalogServices from "../services/MovieCatalogServices";

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';*/

interface Props {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
    movieToEdit: any;
    isAdding: boolean;
    isEditing: boolean;
}

interface countryProps {
    code: string,
    name: string,
    uuid: string
}

export const AddEditMovie: React.FC<Props> = ({setIsEditing, setIsAdding, movieToEdit, isAdding, isEditing}) => {
    const classes = useStyles();
    const [movieName, setMovieName] = useState<string>('');
    const [country, setCountry] = useState<countryProps>(isAdding ? {} : movieToEdit?.movieObj?.country ?? {});
    const allCountries = useSelector((state: any) => state.countries);
    const dispatch = useDispatch();

    const handleChange = (event: SyntheticEvent<Element, Event>, value: string) => {
        const country = allCountries.find((country: any) => country.name === value)
        setCountry(country)
    };

    const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = event.target
        setMovieName(value);
    };


    const saveMovie = () => {
        const countryUuid: string = country.uuid;
        if (isAdding) {
            dispatch(addMovie({name: movieName, countryUuid}))
        } else {
            const data = {
                "countryUuid": countryUuid,
                "name": movieName,
            }
            dispatch(editMovie(movieToEdit.movieObj.uuid, data))
        }

        setIsEditing(false);
        setIsAdding(false);
    };
    const [open, setOpen] = useState(false);
    /*
    const [newCountries, setNewCountries] = useState([]);
    const handleOnInputChange = async (event: any) => {
        setInputValue(event.target.value)
        dispatch(fetchCountries(inputValue))
        /!*
          setNewCountries(response)*!/
    }*/

    /*  const handleArrowClick = () => {
        if(allCountries.length === 0){
            dispatch(fetchCountries())
        }

        // setNewCountries(allCountries)
        setOpen(true)
    }*/
    /*  const [inputValue, setInputValue] = useState('');
    const handleOnInputChange = async (event: any) => {
        setInputValue(event.target.value)
    }*/

    const CountriesListAutoComplete = () => {
        const props = {
            value: country?.name,
            options: allCountries.map((option: any) => option.name),
        };
        return (<Autocomplete
            {...props}
            defaultValue={isAdding ? null : movieToEdit.movieObj.country.name}
            id="countries"
            size={'small'}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => {
                if(allCountries.length < 1){
                    dispatch(fetchCountries())
                }
                setOpen(true)
            }}
           /* onInputChange={(event, value) => {
                dispatch(fetchCountries(value))
            }}*/
            renderInput={(params) => (
                <TextField name={'countryUuid'} {...params} variant="outlined" onChange={(event: any) => {
                    dispatch(fetchCountries(event.target.value))
                }}/>
            )}
           /* onFocusCapture={() => dispatch(fetchCountries())}*/
            onChange={(event: SyntheticEvent<Element, Event>, value: string) => handleChange(event, value)}
            fullWidth
        />)
    }

    return (
        <Grid container spacing={1} className={classes.contentContainer}>
            <Grid container item xs={12} className={classes.header}>
                <Typography variant="h4" className={classes.headerText}>Movie Add (Edit)</Typography>
            </Grid>
            <Grid container className={classes.formContainer}>
                <Grid container item xs={10} className={classes.inputsSections}>
                    <Grid item xs={1}>
                        <InputLabel>Name</InputLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField size={'small'} variant="outlined" id="name" name="name"
                                   defaultValue={isAdding ? '' : movieToEdit.movieObj.name}
                                   onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChangeName(event)}
                                   type={'text'}
                                   fullWidth
                        />

                    </Grid>
                </Grid>
                <Grid container item xs={10} className={classes.inputsSections}>
                    <Grid item xs={1}>
                        <InputLabel>Country</InputLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <CountriesListAutoComplete/>
                    </Grid>
                </Grid>
                <Grid container item xs={10} className={classes.btnSections}>
                    {/*    <Grid xs={2}/>*/}

                    <Grid item xs={3}>
                        <Button sx={{width: 150, height: 30}} variant="contained" type={'submit'}
                                onClick={saveMovie}>Save</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button sx={{width: 150, height: 30}} variant="outlined" onClick={() => {
                            setIsEditing(false)
                            setIsAdding(false)
                        }}>Cancel</Button>
                    </Grid>


                </Grid>
            </Grid>
        </Grid>

    )
}


