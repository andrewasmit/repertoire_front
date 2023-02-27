import React, { useState } from "react";
import { Button, Alert, Snackbar } from "@mui/material";
import Notification from "./Notification";


function Home(){

    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

    function handleNotify(){
        setNotify({
            isOpen: true,
            message: 'OH YEAH!',
            type:'success'
        })
    }

    return(
        <div id="home-page">
            <h1>THIS IS THE HOMEPAGE! YAY!</h1>
            <Button variant="contained" onClick={handleNotify}>Submit</Button>
            <Notification notify={notify} setNotify={setNotify}/>
        </div>
    )
};

export default Home;