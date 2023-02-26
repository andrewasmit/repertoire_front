import React from "react"
import NavBar from "./NavBar";
// Material UI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, Typography } from "@mui/material";


function Header (){
    return(
    <div id="header">
        <Container>
            <Typography variant="h3" component="h2">Repertoire</Typography>
            <Typography variant="subtitle1" component="h4">A performance tracker and curriculum planner for Music Teachers</Typography>
            <NavBar />
        </Container>
    </div>
    )
};

export default Header;