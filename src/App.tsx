import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MovieList} from "./components/MoviesList";
import {Grid} from "@material-ui/core";

function App() {
  return (
    <Grid >
     <MovieList/>
    </Grid>
  );
}

export default App;
