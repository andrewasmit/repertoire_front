import React, { useState } from "react";
import { Button, Alert, Snackbar } from "@mui/material";
import Notification from "./Notification";
import Confirmation from "./Confirmation";


function Home(){

    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subtitle: ''})

    function handleNotify(){
        setNotify({
            isOpen: true,
            message: 'OH YEAH!',
            subtitle:'success'
        })
    }

    function handlePopUp(){
        // if(window.confirm('ARE YOU FUCKIN SURE, BRO!?')){
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure?',
                subtitle: 'you can\'t undo this bro.',
                type:'warning'
            })
        // }
    }

    function onConfirm(){
        console.log("CONFIRMED")
        setConfirmDialog({...confirmDialog, isOpen: false})
    }

    return(
        <div id="home-page">
            <h1>THIS IS THE HOMEPAGE! YAY!</h1>
            <Button variant="contained" onClick={handlePopUp}>Submit</Button>
            <Notification notify={notify} setNotify={setNotify}/>
            <Confirmation confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} onConfirm={onConfirm}/>
        </div>
    )
};

export default Home;