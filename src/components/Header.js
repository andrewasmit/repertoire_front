import React from "react"
import NavBar from "./NavBar";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Typography } from "@mui/material";


function Header (){
    return(
    <div id="header">
        <Typography variant="h5" component="h4">Repertoire</Typography>
        <Typography variant="subtitle1" component="h4">A performance tracker and curriculum planner for Music Teachers</Typography>
        <NavBar />
    </div>
    )
};

export default Header;