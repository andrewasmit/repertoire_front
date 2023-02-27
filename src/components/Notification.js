import React from "react";

import { Snackbar, Alert } from "@mui/material";

function Notification({ notify, setNotify }){

    function handleClose(r){
        if(r==='clickaway'){
            return
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return(
        <Snackbar
            open = {notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            onClose={handleClose}
        >
            <Alert severity={notify.type} onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}


export default Notification;