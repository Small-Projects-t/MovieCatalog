import React, {useEffect, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { Grid} from '@material-ui/core';
import {Autocomplete, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchCountries} from "../redux/countryReducer";
import {addMovie, editMovie} from "../redux/moviesReducer";
import useStyles from '../styles/AddEditMovie.style';

/*import MovieCatalogServices from "../services/MovieCatalogServices";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';*/

interface Props {
    setIsEditing: any;
    setIsAdding: any;
    movieToEdit: any;
    isAdding: boolean;
    isEditing: boolean;
}

export const AddEditMovie: React.FC<Props> = ({setIsEditing, setIsAdding, movieToEdit, isAdding, isEditing}) => {
    const classes = useStyles();
    const [movieName, setMovieName] = useState();
    const [country, setCountry] = useState<any>(isAdding ? {} : movieToEdit?.movieObj?.country ?? {});
    const allCountries = useSelector((state: any) => state.countries);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCountries())
    }, [isAdding, isEditing])


    const handleChange = (event: any, value: any) => {
        console.log('event', event)
        const country = allCountries.find((country: any) => country.name === value)
        setCountry(country)
    };

    const handleChangeName = (event: any) => {
        const {value} = event.target
        setMovieName(value);
    };


    const saveMovie = () => {
        const countryUuid: any = country.uuid;
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

    /*const [inputValue, setInputValue] = useState("");
    const [newFetchedCountries, setnewFetchedCountries] = useState(allCountries);
    const [open, setOpen] = useState(false);

    const handleInput = async (event: any) => {
        if(event.target.value){
            const response = await MovieCatalogServices.getCounties(event.target.value).then((res: any) => {
                return res.data
            })
        }
    };
    const handleArrowClick = () =>{
        setOpen(!open)
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
           // className={classes.autoComplete}
            /*open={open}
            onClose={()=> setOpen(false)}
            popupIcon={<ArrowDropDownIcon onClick={() => handleArrowClick()}/>}*/
            renderInput={(params) => (
                <TextField name={'countryUuid'} {...params} /*onChange={(event: any) =>handleInput(event)}*/
                           label="Countries" variant="outlined" />
            )}
            onChange={(event, value) => handleChange(event, value)}
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
                    <Grid xs={1}>
                        <InputLabel>Name</InputLabel>
                    </Grid>
                    <Grid xs={9}>
                        <TextField size={'small'} variant="outlined" id="name" name="name" defaultValue={isAdding ? '' : movieToEdit.movieObj.name}
                               onChange={(event: any) => handleChangeName(event)} type={'text'}
                               placeholder={'Enter Name'} fullWidth
                        />

                    </Grid>
                </Grid>
                <Grid container item xs={10} className={classes.inputsSections}>
                    <Grid xs={1}>
                        <InputLabel>Country</InputLabel>
                    </Grid>
                    <Grid xs={9}>
                        <CountriesListAutoComplete/>
                    </Grid>
                </Grid>
                <Grid container item xs={10} className={classes.btnSections}>
                {/*    <Grid xs={2}/>*/}

                    <Grid xs={3}>
                        <Button sx={{width: 150, height: 30}} variant="contained" type={'submit'} onClick={saveMovie}>Save</Button>
                    </Grid>
                    <Grid xs={2}>
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


