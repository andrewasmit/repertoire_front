import { Grid, Typography, Button, Box, TextField, Fab, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Container } from "@mui/system";
// import Fab from "@mui/material";
import React, { useState, useEffect } from "react";
import ConcertProgram from "./ConcertProgram";
import NavigationIcon from '@mui/icons-material/Navigation';


function ConcertArchives({ musicLibrary }){

    const [concertPrograms, setConcertPrograms] = useState([]);
    const [allEnsembles, setAllEnsembles] = useState([]);
    const [newEns, setNewEns] = useState("");
    const [gradeLevel, setGradeLevel] = useState("--Choose Grade Level--")
    const [addNewEns, setAddNewEns] = useState(false);
    const [concertDescription, setConcertDescription] = useState("");
    const [year, setYear] = useState(null);
    const [addNewConcert, setAddNewConcert] = useState(false);

    // Fetching ensembles
    useEffect(()=>{
        fetch("http://localhost:9292/ensembles")
        .then(res=>res.json())
        .then(data=>setAllEnsembles(data))
        .catch(err=>console.log(err));
    }, []);

    // Fetching Concert Program data (ensembles and performances of pieces)
    useEffect(()=>{
        fetch("http://localhost:9292/concerts")
        .then(res=>res.json())
        .then(data=>setConcertPrograms(data))
        .catch(err=>console.log(err));
    }, []);

    const programsToDisplay = concertPrograms.map(c=>{
        return <ConcertProgram 
                    concert_description={c.concert_description} 
                    allEnsembles={allEnsembles}
                    performances={c.performances}
                    year={c.year}
                    id={c.id}
                    key={c.id}
                    musicLibrary={musicLibrary}
                    concertPrograms={concertPrograms}
                    setConcertPrograms={setConcertPrograms}
                    handleConcertPatch={handleConcertPatch}
                />
    })

    // Function passed down to handle state after a Fetch
    function handleConcertPatch(data){
        const filtered_arr = [...concertPrograms.filter(concert=>concert.id !== data.id)]
        filtered_arr.splice(data.id - 1, 0, data)
        return setConcertPrograms(filtered_arr) 
    }

    function handleSubmitNewEns(e){
        e.preventDefault();
        const newEnsemble = {name: newEns, grade_level: gradeLevel}
        fetch("http://localhost:9292/ensembles", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newEnsemble)
        })
        .then(res=>res.json())
        .then(data=>setAllEnsembles([...allEnsembles, data]))
        setNewEns("")
        setAddNewEns(false)
    }

    function handleSubmitNewConcert(e){
        e.preventDefault();
        const newConcert = {concert_description: concertDescription, year: year}
        fetch("http://localhost:9292/concerts", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newConcert)
        })
        .then(res=>res.json())
        .then(data=>setConcertPrograms([...concertPrograms, data]))
        setConcertDescription("")
        setAddNewEns(false)
    }

    function handleNewConcertClick(){
        if(addNewEns === true){
            setAddNewEns(false)
        }
        setAddNewConcert(!addNewConcert); 
        setConcertDescription(""); 
        setYear("")
    }

    function handleNewEnsembleClick(){
        if(addNewConcert === true){
            setAddNewConcert(false)
        }
        setAddNewEns(!addNewEns); 
        setYear(""); 
        setNewEns("")
    }
    

    // Return of JSX
    return(
        <Grid container spacing={4} id="concert-archives">
            <Typography variant="h4" component="h3">CONCERT ARCHIVES</Typography>
            <Button onClick={handleNewConcertClick}>{addNewConcert ? "Discard New Concert" : "Add New Concert" }</Button>
            <Button onClick={handleNewEnsembleClick}>{addNewEns ? "Discard New Ensemble" : "Add New Ensemble" }</Button>

            {/* Toggle Form for submitting New Concert */}
            { addNewConcert ? <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate                    
                autoComplete="off"
                onSubmit={handleSubmitNewConcert}
            >
                <TextField
                    id="new-concert-name"
                    label="New Concert Description"
                    value={concertDescription}
                    onChange={e=>setConcertDescription(e.target.value)}
                />
                <TextField
                    id="new-concert-year"
                    label="Year"
                    value={year}
                    onChange={e=>setYear(e.target.value)}
                />
                <Fab type="submit" variant="extended"><NavigationIcon />Submit New Concert</Fab>
            </Box> : null }

        {/* Toggle Form for submitting New Ensemble */}
            { addNewEns ? <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate                    
                autoComplete="off"
                onSubmit={handleSubmitNewEns}
            >
                <TextField
                    id="new-concert-name"
                    label="New Ensemble "
                    value={newEns}
                    onChange={e=>setNewEns(e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel id="new-performance-ens-dropdown">Select Performing Ensemble</InputLabel>
                    <Select
                        labelId="new-ens-grade-dropdown"
                        id="new-ens-grade-dropdown"
                        value={gradeLevel}
                        label="--Choose Grade Level--"
                        onChange={e=>setGradeLevel(e.target.value)}
                    >
                        <MenuItem value={null} disabled>--Choose Grade Level--</MenuItem>
                        <MenuItem value={"High School"} >High School</MenuItem>
                        <MenuItem value={"Junior High"} >Junior High</MenuItem>
                        <MenuItem value={"Beginner"} >Beginner</MenuItem>
                    </Select>
                </FormControl>
                <Fab type="submit" variant="extended"><NavigationIcon />Submit New Ensemble</Fab>
            </Box> : null }
            
            {programsToDisplay}            
        </Grid>
    )
};

export default ConcertArchives;