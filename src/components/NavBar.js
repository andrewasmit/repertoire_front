import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function NavBar(){

    const [page, setPage] = useState('/');
    const history = useHistory();

    function handleChange(e){
        e.preventDefault()
        setPage(e.target.value)
        history.push(e.target.value)
    }
    // function handleChange(e){
    //     e.preventDefault();
    //     console.log(e.target.value);
    // }

    console.log(page);

    return(
        <div id="navbar">
            <ToggleButtonGroup
                color="primary"
                value={page}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value="/">Home</ToggleButton>
                <ToggleButton value="/library">Music Library</ToggleButton>
                <ToggleButton value="/concerts">Concert Archives</ToggleButton>
            {/* <ButtonGroup variant="text" aria-label="text button group">
                <Button href="/">Home</Button>
                <Button href="/library">Music Library</Button>
                <Button href="/concerts">Concert Archives</Button>
            </ButtonGroup> */}
            </ToggleButtonGroup>
        </div>
    )
}

export default NavBar;