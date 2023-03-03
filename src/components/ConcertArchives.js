import { Grid, Typography, Button, ButtonGroup, Box, TextField, Fab, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import ConcertProgram from "./ConcertProgram";
import NavigationIcon from '@mui/icons-material/Navigation';
import Notification from "./Notification";


function ConcertArchives({ 
        musicLibrary, 
        onConfirm, 
        handlePopUp, 
        notify, 
        setNotify, 
        handleNotify,
        confirmDialog, 
        setConfirmDialog 
    }){

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
                    className="concert-program"
                    handleNotify={handleNotify}
                    notify={ notify }
                    setNotify={ setNotify }
                    confirmDialog={ confirmDialog }
                    setConfirmDialog={ setConfirmDialog }
                    onConfirm={onConfirm} 
                    handlePopUp={handlePopUp}
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
        handleNotify(`New Ensemble: "${newEns}" created succesfullly`, 'success')
        setNewEns("")
        setGradeLevel("--Choose Grade Level--")
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
        .then(data=>setConcertPrograms(data))
        setConcertDescription("")
        setYear(null)
        setAddNewEns(false)
        setAddNewConcert(false)
        handleNotify(`New Concert: "${concertDescription} -${year}" created succesfullly`, 'success')
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
            <Grid item xs={12} >
                <Typography variant="h4" component="h3" className="page-header">CONCERT ARCHIVES</Typography>
            </Grid>
            <Grid item xs={12} >
                <ButtonGroup className="button-group">
                    <Button onClick={handleNewConcertClick}>{addNewConcert ? "Discard New Concert" : "Add New Concert" }</Button>
                    <Button onClick={handleNewEnsembleClick}>{addNewEns ? "Discard New Ensemble" : "Add New Ensemble" }</Button>
                </ButtonGroup>
            </Grid>
            

            {/* Toggle Form for submitting New Concert */}
            { addNewConcert ? <Grid container className="archive-form"> <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                noValidate                    
                autoComplete="off"
                onSubmit={handleSubmitNewConcert}
            >
                <Grid item xs={12} >
                <TextField
                    id="new-concert-name"
                    label="New Concert Description"
                    value={concertDescription}
                    onChange={e=>setConcertDescription(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    id="new-concert-year"
                    label="Year"
                    value={year}
                    onChange={e=>setYear(e.target.value)}
                    sx={{width: '40ch' }}
                />
                </Grid>
                <Fab type="submit" variant="extended" className="archive-form"><NavigationIcon />Submit New Concert</Fab>
            </Box></Grid> : null }

        {/* Toggle Form for submitting New Ensemble */}
            { addNewEns ? <Grid container className="archive-form"><Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { width: '40ch', margin: '15px' },
                }}
                noValidate                    
                autoComplete="off"
                onSubmit={handleSubmitNewEns}
            >
                <Grid item xs={12} >
                <TextField
                    id="new-concert-name"
                    label="New Ensemble "
                    value={newEns}
                    onChange={e=>setNewEns(e.target.value)}
                    sx={{
                        '& .MuiTextField-root': {width: '40ch' },
                    }}
                />
                </Grid>
                <Grid item xs={12} >
                <FormControl fullWidth>
                    <InputLabel id="new-performance-ens-dropdown">Select Grade Level</InputLabel>
                    <Select
                        labelId="new-ens-grade-dropdown"
                        id="new-ens-grade-dropdown"
                        value={gradeLevel}
                        label="--Choose Grade Level--"
                        onChange={e=>setGradeLevel(e.target.value)}
                        sx={{width: '40ch', margin: '15px' }}
                    >
                        <MenuItem value={null} disabled>--Choose Grade Level--</MenuItem>
                        <MenuItem value={"High School"} >High School</MenuItem>
                        <MenuItem value={"Junior High"} >Junior High</MenuItem>
                        <MenuItem value={"Beginner"} >Beginner</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Fab type="submit" variant="extended" className="archive-form"><NavigationIcon />Submit New Ensemble</Fab>
            </Box></Grid> : null }
            
            {programsToDisplay}    
            <Notification notify={notify} setNotify={setNotify} />        
        </Grid>
    )
};

export default ConcertArchives;