import { Delete, RemoveCircleOutline } from "@mui/icons-material";
import { Paper, Typography, Fab } from "@mui/material";
import React from "react";

function Performance({ composer, arranger, title, ensemble, id, handleConcertPatch }){


    function handleDeletePerformanceClick(e){
        e.preventDefault();
        fetch(`http://localhost:9292/concerts/performances/${id}`, {
            method: "DELETE"
        })
        .then(res=>res.json())
        .then(data=>handleConcertPatch(data))
    }

    // Return of JSX
    return(
        <Paper elevation={7}>
            <Typography variant="h5" component="h3">{title}</Typography>
            <Typography variant="subtitle1" component="h5">{composer}</Typography>
            {arranger === null || undefined ? null : <Typography variant="subtitle2" component="h6">Arr: {arranger}</Typography>}
            <Typography variant="body2" component="p">{ensemble}</Typography>
            <Fab onClick={handleDeletePerformanceClick} size="small" color="primary" aria-label="add">
                <RemoveCircleOutline />
            </Fab>
        </Paper>
    )
};


export default Performance;