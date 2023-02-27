import React, { useState } from "react";
import { Button, Alert, Snackbar } from "@mui/material";
import Notification from "./Notification";
import Confirmation from "./Confirmation";


function Home(){

    


    return(
        <div id="home-page">
            <h1>THIS IS THE HOMEPAGE! YAY!</h1>
            {/* <Button variant="contained" onClick={handlePopUp}>Submit</Button> */}
            {/* <Notification notify={notify} setNotify={setNotify}/>
            <Confirmation confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} onConfirm={onConfirm}/> */}
        </div>
    )
};

export default Home;