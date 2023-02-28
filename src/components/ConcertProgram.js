import React, { useState, useEffect } from "react";
import Performance from "./Performance";

// Material UI
import { Grid, TextField, Box, Fab, Container, Typography, Button, ButtonGroup, FormControl, InputLabel, Select, MenuItem, Paper } from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';
import Notification from "./Notification";
import Confirmation from "./Confirmation";




function ConcertProgram({ 
            id, 
            concert_description, 
            concertPrograms, 
            year, 
            allEnsembles, 
            performances, 
            musicLibrary, 
            setConcertPrograms, 
            handleConcertPatch,
            handleNotify,
            notify,
            setNotify,
            confirmDialog,
            setConfirmDialog,
            handlePopUp,
            onConfirm
        }){

    const [showProgram, setShowProgram] = useState(false);
    const [addAPiece, setAddAPiece] = useState(false);
    const [editConcert, setEditConcert] = useState(false);
    const [newPerformance, setNewPerformance] = useState("--Select a Piece--");
    const [selectedEns, setSelectedEns] = useState("--Select an Ensemble--");
    const [description, setDescription] = useState(concert_description);
    const [concertYear, setConcertYear] = useState(year);
    const [performancesToDisplay, setPerformancesToDisplay] = useState([]);
    const [dropdownOptionsForEnsembles, setDropdownOptionsForEnsembles] = useState(allEnsembles.map(p=>{
        return <option id={p.id}>{p.name}</option>
    }))

    useEffect(()=>{
        if(performances !== [] && allEnsembles !== []){
        setPerformancesToDisplay( performances.map(performance=>{
            const composer = musicLibrary.filter(piece=>piece.id === performance.piece_id)[0].composer
            const arranger = musicLibrary.filter(piece=>piece.id === performance.piece_id)[0].arranger
            const title = musicLibrary.filter(piece=>piece.id === performance.piece_id)[0].title
            const ensemble = allEnsembles.filter(ens=>ens.id === performance.ensemble_id)[0].name
    
            return <Performance 
                        composer={composer}
                        arranger={arranger}
                        title={title}
                        ensemble={ensemble}
                        id={performance.id}
                        key={performance.id}
                        handleConcertPatch={handleConcertPatch}
                        handleNotify={handleNotify}
                    />
        }) ) }
    }, [musicLibrary, concertPrograms, allEnsembles, performances, handleConcertPatch]);  

    
// Fetch for Adding a new performance to the program
    function handleAddNewPiece(e){
        e.preventDefault();
        const pieceToAdd = {
            performance: newPerformance,
            ensemble: selectedEns,
            concert: id
        };
        fetch(`http://localhost:9292/concerts/performance/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(pieceToAdd)
        })
        .then(res=>res.json())
        .then(data=>handleConcertPatch(data))
        setNewPerformance("--Select a Piece--");
        setSelectedEns("--Select an Ensemble--");
        setAddAPiece(false);
        setShowProgram(true);
        handleNotify(`"${newPerformance}" added successfully`)
    }

    // Fetch for editing the Concert Program details (name/year)
    function handleEditConcert(e){
        e.preventDefault();
        const editedConcert = {
            concert_description: description,
            year: concertYear
        };
        fetch(`http://localhost:9292/concerts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editedConcert)
        })
        .then(res=>res.json())
        .then(data=>handleConcertPatch(data))
        setEditConcert(false);
    }

    function handleDeleteProgram(){
        fetch(`http://localhost:9292/concerts/${id}`, {
            method: "DELETE",
        })
        .then(res=>res.json())
        .then(data=>setConcertPrograms(data))
        setEditConcert(false);
    }

    function handleResetFrom(){
        setAddAPiece(false)
        setSelectedEns("--Select an Ensemble--")
        setNewPerformance("--Select a Piece--")
    }
    

    const dropdownOptionsForPiece = [...new Set(musicLibrary)].map(p=>{
        return <MenuItem id={p.id} value={p.title}>{p.title}</MenuItem>
    })

useEffect(()=>{ setDropdownOptionsForEnsembles(allEnsembles.map(p=>{
    return <MenuItem id={p.id} value={p.name}>{p.name}</MenuItem>
    }))
}, [allEnsembles]) 


    // Return of JSX
    return(
        <Grid item xs={12} md={6} xl={4} className="concert-program">
            <Paper elevation={4}>
            { editConcert ?
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate                    
                autoComplete="off"
                className="new-program-form"
                onSubmit={handleEditConcert}
            >
                <TextField
                    id="description-concert-update"
                    label="Concert Description"
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                />  
                <TextField
                    id="year-concert-update"
                    label="Year"
                    value={concertYear}
                    onChange={e=>setConcertYear(e.target.value)}
                />
                <Fab type="submit" variant="extended"><NavigationIcon sx={{ mr: 1 }} />Submit Changes</Fab>
            </Box> :
            <Container >
                <Typography className="program-title" variant="h4" component="h3">{concert_description}</Typography>
                <Typography className="program-year" variant="h5" component="h4">{year}</Typography>
            </Container> 
            }

            {/* Show Performance / Add Piece Buttons */}
            <ButtonGroup maxWidth variant="text" size="large" aria-label="small button group" className="button-group">
                <Button  onClick={()=>setShowProgram(!showProgram)}>{showProgram ? "Hide Performances" : "Show Performances" }</Button>
                <Button  onClick={()=>setAddAPiece(!addAPiece)}>{addAPiece ? "Discard New Performance" : "Add Performance" }</Button>
            </ButtonGroup>
            
            {/* Toggle form to Add a Piece */}
            { addAPiece ?   
            <Container>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate                    
                    autoComplete="off"
                    onSubmit={handleAddNewPiece}
                >
                <FormControl fullWidth>
                    <InputLabel>Select Piece to Perform on Program</InputLabel>
                    <Select
                        labelId="new-performance-dropdown"
                        id="new-performance-dropdown"
                        value={newPerformance}
                        label="Select a Piece"
                        className="new-performance-dropdown"
                        onChange={e=>setNewPerformance(e.target.value)}
                    >
                        <MenuItem value={null} disabled>--Select a Piece--</MenuItem>
                        {dropdownOptionsForPiece}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="new-performance-ens-dropdown">Select Performing Ensemble</InputLabel>
                    <Select
                        labelId="new-performance-ens-dropdown"
                        id="new-performance-ens-dropdown"
                        value={selectedEns}
                        label="Select a Piece"
                        className="new-performance-dropdown"
                        onChange={e=>setSelectedEns(e.target.value)}
                    >
                        <MenuItem value={null} disabled>--Select an Ensemble--</MenuItem>
                        {dropdownOptionsForEnsembles}
                    </Select>
                </FormControl>
                <ButtonGroup maxWidth variant="text" size="large" aria-label="small button group" className="button-group">
                    <Button onClick={handleResetFrom} size="medium" color="primary" aria-label="reset">Reset Form</Button>
                    <Button type="submit">Submit</Button>
                </ButtonGroup>
                </Box>
            </Container>  : null } 
            { showProgram ? performancesToDisplay : null }
            { showProgram && performancesToDisplay.length === 0 ? 
                <Typography variant="body2" component="p" className="performance-card">There are currently no performances for <strong>{concert_description}</strong></Typography> 
                    : null }

            {/* Edit / Delete Buttons */}
            <Button variant="contained" onClick={()=>setEditConcert(!editConcert)} className="card-button-group">{ editConcert ? "Discard Edit Concert" : "Edit Concert Details" }</Button>
            <Button variant="outlined" onClick={()=>handlePopUp(concert_description)}className="card-button-group">Delete Concert Program</Button>
        </Paper>
    <Notification notify={notify} setNotify={setNotify} />
    <Confirmation confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} onConfirm={()=>onConfirm(`"${concert_description} -${year}" deleted succesfully`, "error", handleDeleteProgram)}/>
    </Grid>
    )
};

export default ConcertProgram;