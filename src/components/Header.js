import React from "react"
import NavBar from "./NavBar";

function Header (){
    return(
    <div id="header">
        <h2>Repertoire</h2>
        <p>A performance tracker and curriculum planner for Music Teachers</p>
        <NavBar />
    </div>
    )
};

export default Header;