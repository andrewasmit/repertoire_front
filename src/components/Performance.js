import { Paper, Typography, Fab, Button } from "@mui/material";
import React from "react";

function Performance({ 
            composer, 
            arranger, 
            title, 
            ensemble, 
            id, 
            handleConcertPatch, 
            handleNotify 
        }){


    function handleDeletePerformanceClick(e){
        e.preventDefault();
        fetch(`http://localhost:9292/concerts/performances/${id}`, {
            method: "DELETE"
        })
        .then(res=>res.json())
        .then(data=>handleConcertPatch(data))
        handleNotify(`"${title}" removed from program`, "error")
    }

    // Return of JSX
    return(
        <Paper elevation={4} className="performance-card">
            <Typography variant="h5" component="h3" className="card-title">{title}</Typography>
            <Typography variant="subtitle1" component="h5" className="card-composer">{composer}</Typography>
            {arranger === null || arranger === undefined ? null : <Typography variant="subtitle2" component="h6" className="card-body">Arr: {arranger}</Typography>}
            <Typography variant="body2" component="p">{ensemble}</Typography>
            <Button variant="text" onClick={handleDeletePerformanceClick} size="small">Remove Performance</Button>
        </Paper>
    )
};


export default Performance;