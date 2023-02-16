import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return(
        <div id="navbar">
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/library">Music Library</NavLink>
            <NavLink to="/concerts">Concert Archives</NavLink>
        </div>
    )
}

export default NavBar;