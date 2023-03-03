import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Grid } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Button from "@mui/material/Button";


function AddEditPieceForm(props){

    const [genreDropdownOptions, setGenreDropdownOptions] = useState(props.musicLibrary.map(p=>p.genre))
    const [difficultyDropdownOptions, setDifficultyDropdownOptions] = useState(props.musicLibrary.map(p=>p.difficulty))
    const [createGenre, setCreateGenre] = useState(false)
    const numOfPlayerArr = [1,2,3,4,5,6,7,8,9,10,11,"12+"]


    useEffect(()=>{ 
        setGenreDropdownOptions([...new Set(genreDropdownOptions)].map(genre=>{
            return <MenuItem value={genre}>{genre}</MenuItem>
        }))
    },[])

    useEffect(()=>{ 
        setDifficultyDropdownOptions([...new Set(difficultyDropdownOptions)].sort().map(diff=>{
            return <MenuItem value={diff + " - " + props.difficultyToString(diff)}>{diff + " - " + props.difficultyToString(diff)}</MenuItem>
        }))
    },[])

    const numPlayerDropdowns = numOfPlayerArr.map(num=>{
        return <MenuItem value={num}>{num}</MenuItem>
    })


// Submit form for NEW piece
    function handleNewPieceSubmit(e){
        e.preventDefault();
        const newPiece = {
            title: props.title,
            composer: props.composer,
            arranger: props.arranger,
            difficulty: parseInt(props.difficulty),
            number_of_players: parseInt(props.numPlayers),
            genre: props.genre,
            reference_recording: props.refRecord,
            notes: props.notes
        };
        console.log("before Fetch (NEW)", newPiece)
        fetch("http://localhost:9292/library", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newPiece)
        })
        .then(res=>res.json())
        .then(data=>props.setMusicLibrary([...props.musicLibrary, data]))
        props.resetForm()
        if(createGenre===true){
            setCreateGenre(false)
        }
        props.setShowForm(false);
        props.handleNotify(`New Piece: "${props.title}" created successfully`)
    }

// Submit form for EDIT piece
    function handleEditPieceSubmit(e){
        e.preventDefault();
        const editedPiece = {
            title: props.title,
            composer: props.composer,
            arranger: props.arranger,
            difficulty: parseInt(props.difficulty),
            number_of_players: parseInt(props.numPlayers),
            genre: props.genre,
            reference_recording: props.refRecord,
            notes: props.notes
        };
        console.log("before Fetch (EDIT)", editedPiece)
        fetch(`http://localhost:9292/library/${props.editId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editedPiece)
        })
        .then(res=>res.json())
        .then(data=>{
            const filtered_arr = [...props.musicLibrary.filter(p=>p.id !== props.editId)];
            filtered_arr.splice(props.editId - 1, 0, data )
            return props.setMusicLibrary(filtered_arr)
        })
        props.resetForm()
        if(createGenre===true){
            setCreateGenre(false)
        }
        props.handleNotify(`"${props.title}" successfully updated`)
    }

    // Return of JSX
    return(
    <Grid container className="archive-form">
        <Grid item xs={12}>
            <Typography variant="h4" component="h3">{ props.editPiece ? `Edit "${props.title}"` : "Add A New Piece" }</Typography>
        </Grid>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={ props.editPiece ? handleEditPieceSubmit : handleNewPieceSubmit }
        >
            {/* Title */}
        <Grid item xs={12} md={6} xl={4}> 
            <TextField
                id="outlined-controlled"
                label="Title"
                value={props.title}
                onChange={e=>props.setTitle(e.target.value)}
            />
        </Grid>

            {/* Composer */}
        <Grid item xs={12} md={6} xl={4}>
            <TextField
                id="outlined-controlled"
                label="Composer"
                value={props.composer}
                onChange={e=>props.setComposer(e.target.value)}
            />
        </Grid>
            {/* Arranger - OPTIONAL */}
        <Grid item xs={12} md={6} xl={4}>
            { props.showArr ? <TextField
                id="outlined-controlled"
                label="Arranger"
                value={props.arranger}
                onChange={e=>props.setArranger(e.target.value)}
            /> : null }
        </Grid>

            {/* Difficulty */}
        <Grid item xs={12} md={6} xl={4}>
            <FormControl fullWidth>
                <InputLabel id="difficulty-dropdown">Difficulty</InputLabel>
                <Select
                    labelId="difficulty-dropdown-label"
                    id="difficulty-dropdown"
                    value={props.difficulty}
                    label="Difficulty"
                    onChange={e=>props.setDifficulty(e.target.value)}
                >
                    <MenuItem disabled value={null}>--Select Difficulty--</MenuItem>
                    {difficultyDropdownOptions}
                </Select>
                </FormControl>
        </Grid>

            {/* Genre Dropdown Menu */}
        <Grid item xs={12}>
            { createGenre ? <TextField
                id="outlined-controlled"
                label="Create Genre"
                value={ createGenre ? null : props.genre }
                onChange={e=>props.setGenre(e.target.value)}            
            /> 
            : <FormControl fullWidth>
                <InputLabel id="genre-dropdown">Genre</InputLabel>
                <Select
                    labelId="genre-dropdown-label"
                    id="genre-dropdown"
                    value={props.genre}
                    label="Genre"
                    onChange={e=>props.setGenre(e.target.value)}
                >
                    <MenuItem disabled value={null}>--Select Genre--</MenuItem>
                    {genreDropdownOptions}
                </Select>
                </FormControl> }
        </Grid>

            {/* # of Players */}
        <Grid item xs={12} md={6} xl={4} >
            <FormControl fullWidth>
                <InputLabel id="numPlayers-dropdown">Number of Players</InputLabel>
                <Select
                    labelId="numPlayers-dropdown-label"
                    id="numPlayers-dropdown"
                    value={props.numPlayers}
                    label="# of Players"
                    onChange={e=>props.setNumPlayers(e.target.value)}
                >
                    <MenuItem disabled value={null}>--Select Number of Players--</MenuItem>
                    {numPlayerDropdowns}
                </Select>
                </FormControl>
        </Grid>

            {/* Refence Recording - OPTIONAL */}
            { props.showRefRecord ? <Grid item xs={12} md={6} xl={4}><TextField
                id="outlined-controlled"
                label="Link to Recording"
                value={props.refRecord}
                onChange={e=>props.setRefRecord(e.target.value)}
            /> </Grid>: null }

            {/* Notes - OPTIONAL */}
            { props.showNotes ? <Grid item xs={12} md={6} xl={4}><TextField
                id="outlined-controlled"
                label="Notes"
                value={props.Notes}
                onChange={e=>props.setNotes(e.target.value)}
            /> </Grid> : null }


            {/* Toggle to include Optional Inputs */}
            <FormGroup>
                <FormControlLabel control={<Switch checked={props.showArr} onChange={()=>props.setShowArr(!props.showArr)}/>} label="Include Arranger" />
                <FormControlLabel control={<Switch onChange={()=>props.setShowRefRecord(!props.showRefRecord)} checked={props.showRefRecord}/>} label="Include Reference Recording" />
                <FormControlLabel control={<Switch onChange={()=>props.setShowNotes(!props.showNotes)} checked={props.showNotes}/>} label="Include Notes About Piece" />
                <FormControlLabel control={<Switch onChange={()=>setCreateGenre(!createGenre)} checked={createGenre}/>} label="Create New Genre" />
            </FormGroup>
            <Button onClick={props.resetForm} variant="outlined">Reset Form</Button>
            <Fab variant="extended" type="submit">
                <NavigationIcon sx={{ mr: 1 }} />Submit
            </Fab>
        </Box>
    </Grid>
    )
};

export default AddEditPieceForm;