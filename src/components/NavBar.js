import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function NavBar(){

    const [page, setPage] = useState('/');
    const history = useHistory();

    function handleChange(e){
        setPage(e.target.value)
        history.push(e.target.value)
    }

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
            </ToggleButtonGroup>
        </div>
    )
}

export default NavBar;