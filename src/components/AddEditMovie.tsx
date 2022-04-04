import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import {Grid} from '@material-ui/core';
import {Autocomplete, TextField, Typography} from "@mui/material";
import {addMovie, editMovie} from "../redux/reducers/moviesReducer";
import useStyles from '../styles/AddEditMovie.style';
import MovieCatalogServices from "../services/MovieCatalogServices";
import {useDispatch} from "react-redux";

interface Props {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
    movieToEdit: any;
    isAdding: boolean;
}
export const AddEditMovie: React.FC<Props> = ({setIsEditing, setIsAdding, movieToEdit, isAdding}) => {
    const classes = useStyles();
    const [movieName, setMovieName] = useState<string>('');
    const [country, setCountry] = useState(isAdding ? {} : movieToEdit?.movieObj?.country ?? {});
    const [countries, setCountries] = useState([]);
    const [inputValue, setInputValue] = useState(isAdding ? '' : movieToEdit.movieObj.country.name);
    const dispatch = useDispatch();

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


    const handleInputChange = async (event: any) => {
        if(event?.target?.value){
            setInputValue(event?.target?.value);
            await MovieCatalogServices.getCounties(event.target.value).then((res: any) => {
                setCountries(res.data)
            })
        }

    };
    const handleChangeAutoComplete = (event: SyntheticEvent<Element, Event>, value: string) => {
        const country: any = countries.find((country: any) => country.name === value)

        setInputValue(country.name);
        setCountry(country)
    };

    const load = async () => {
        await MovieCatalogServices.getCounties().then((res: any) => {
            setCountries(res.data)
        })
    };

    const props = {
        value: country?.name,
        options: countries.map((option: any) => option.name),
        defaultValue: isAdding ? null : movieToEdit.movieObj.country.name
    };

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
                        <Autocomplete
                            {...props}
                            defaultValue={isAdding ? null : movieToEdit.movieObj.country.name}
                            id="countries"
                            size={'small'}
                            inputValue={inputValue}
                            onInputChange={handleInputChange}
                            onFocus={load}
                            renderInput={(params) => (
                                <TextField name={'countryUuid'} {...params} variant="outlined"
                                />
                            )}
                            onChange={(event: SyntheticEvent<Element, Event>, value: string) => handleChangeAutoComplete(event, value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={10} className={classes.btnSections}>
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


