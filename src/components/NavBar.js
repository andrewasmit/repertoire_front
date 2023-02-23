import React from "react";
import { NavLink } from "react-router-dom";

import { Button, ButtonGroup } from "@mui/material";

function NavBar(){
    return(
        <div id="navbar">
            <ButtonGroup variant="text" aria-label="text button group">
                <Button href="/">Home</Button>
                <Button href="/library">Music Library</Button>
                <Button href="/concerts">Concert Archives</Button>
            </ButtonGroup>
        </div>
    )
}

export default NavBar;