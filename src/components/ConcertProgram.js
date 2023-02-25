import React, { useState, useEffect } from "react";
import Performance from "./Performance";

// Material UI
import { TextField, Box, Fab, Container, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NavigationIcon from '@mui/icons-material/Navigation';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { RestartAlt } from "@mui/icons-material"


function ConcertProgram({ 
            id, 
            concert_description, 
            concertPrograms, 
            year, 
            allEnsembles, 
            performances, 
            musicLibrary, 
            setConcertPrograms, 
            handleConcertPatch 
        }){

    const [showProgram, setShowProgram] = useState(true);
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
                    />
        }) ) }
    }, [musicLibrary, concertPrograms, allEnsembles, performances, handleConcertPatch]);  

    
// Fetch for Adding a new Piece
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
        setNewPerformance("--Select a Piece--")
        setSelectedEns("--Select an Ensemble--")
        setAddAPiece(false)
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

    function handleDeleteProgram(e){
        e.preventDefault();
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
        <div className="concert-program">
        <Container>
            { editConcert ?
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate                    
                autoComplete="off"
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
                <Fab type="submit" variant="extended"><NavigationIcon sx={{ mr: 1 }} />Submit</Fab>
            </Box> :
            <Container >
                <Typography variant="h4" component="h3">{concert_description}</Typography>
                <Typography variant="h5" component="h4">{year}</Typography>
            </Container> 
            }

            {/* Edit Buttons */}
            <Button variant="contained" onClick={()=>setEditConcert(!editConcert)}>Edit Concert Details</Button>
            <Button variant="outlined" onClick={handleDeleteProgram}>Delete Concert Program</Button>
            <br></br>
            <Fab color="primary" aria-label="add" onClick={()=>setShowProgram(!showProgram)}>
                { showProgram ? <ExpandLess /> : <ExpandMore />}
            </Fab>
            <Fab color="primary" aria-label="add" onClick={()=>setAddAPiece(true)}>
                <AddIcon />
            </Fab>
            
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
                                <InputLabel id="new-performance-dropdown">Select Piece to Add to Program</InputLabel>
                                <Select
                                    labelId="new-performance-dropdown"
                                    id="new-performance-dropdown"
                                    value={newPerformance}
                                    label="Select a Piece"
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
                                    onChange={e=>setSelectedEns(e.target.value)}
                                >
                                    <MenuItem value={null} disabled>--Select an Ensemble--</MenuItem>
                                    {dropdownOptionsForEnsembles}
                                </Select>
                            </FormControl>
                                <Fab onClick={handleResetFrom} size="medium" color="primary" aria-label="reset">
                                    <RestartAlt />
                                </Fab>
                                <Fab typw="submit" variant="extended" size="medium" color="primary" aria-label="add">
                                    <NavigationIcon sx={{ mr: 1 }} />
                                    Submit
                                </Fab>
                            </Box>
                        </Container>  : null } 

            { showProgram ? performancesToDisplay : null }
            </Container>
        </div>
    )
};

export default ConcertProgram;