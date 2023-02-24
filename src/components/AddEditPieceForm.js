import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';



function AddEditPieceForm(props){

    const [genreDropdownOptions, setGenreDropdownOptions] = useState(props.musicLibrary.map(p=>p.genre))
    const [createGenre, setCreateGenre] = useState(false)


    useEffect(()=>{ 
        setGenreDropdownOptions([...new Set(genreDropdownOptions)].map(genre=>{
            return <MenuItem value={genre}>{genre}</MenuItem>
        }))
    }, [props.musicLibrary, props.genre])

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
    }

// Submit form for EDIT piece
    function handleEditPieceSubmit(e){
        e.preventDefault();
        const editedPiece = {
            title: props.title,
            composer: props.composer,
            arranger: props.arranger,
            difficulty: parseInt(props.difficulty.split('').shift()),
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
    }



    // Return of JSX
    return(
    <div>
        <Typography variant="h4" component="h3">{ props.editPiece ? `Edit "${props.title}"` : "Add A New Piece" }</Typography>
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
            <TextField
                id="outlined-controlled"
                label="Title"
                value={props.title}
                onChange={e=>props.setTitle(e.target.value)}
            />

            {/* Composer */}
            <TextField
                id="outlined-controlled"
                label="Composer"
                value={props.composer}
                onChange={e=>props.setComposer(e.target.value)}
            />

            {/* Arranger - OPTIONAL */}
            { props.showArr ? <TextField
                id="outlined-controlled"
                label="Arranger"
                value={props.arranger}
                onChange={e=>props.setArranger(e.target.value)}
            /> : null }

            {/* Difficulty */}
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
                    <MenuItem value={1}>1 - Easy</MenuItem>
                    <MenuItem value={2}>2 - Med-Easy</MenuItem>
                    <MenuItem value={3}>3 - Medium</MenuItem>
                    <MenuItem value={4}>4 - Med-Advanced</MenuItem>
                    <MenuItem value={5}>5 - Advanced</MenuItem>
                </Select>
                </FormControl>

            {/* Genre Dropdown Menu */}
            { createGenre ? <TextField
                id="outlined-controlled"
                label="Create Genre"
                value={ createGenre ? null : props.composer }
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

            {/* # of Players */}
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
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12+</MenuItem>
                </Select>
                </FormControl>

            {/* Refence Recording - OPTIONAL */}
            { props.showRefRecord ? <TextField
                id="outlined-controlled"
                label="Link to Recording"
                value={props.refRecord}
                onChange={e=>props.setRefRecord(e.target.value)}
            /> : null }

            {/* Notes - OPTIONAL */}
            { props.showNotes ? <TextField
                id="outlined-controlled"
                label="Notes"
                value={props.Notes}
                onChange={e=>props.setNotes(e.target.value)}
            /> : null }


            {/* Toggle to include Optional Inputs */}
            <FormGroup>
                <FormControlLabel control={<Switch checked={props.showArr} onChange={()=>props.setShowArr(!props.showArr)}/>} label="Include Arranger" />
                <FormControlLabel control={<Switch onChange={()=>props.setShowRefRecord(!props.showRefRecord)} checked={props.showRefRecord}/>} label="Include Reference Recording" />
                <FormControlLabel control={<Switch onChange={()=>props.setShowNotes(!props.showNotes)} checked={props.showNotes}/>} label="Include Notes About Piece" />
                <FormControlLabel control={<Switch onChange={()=>setCreateGenre(!createGenre)} checked={createGenre}/>} label="Create New Genre" />
            </FormGroup>
            <Fab variant="extended" type="submit">
                <NavigationIcon sx={{ mr: 1 }} />Submit
            </Fab>
        </Box>
    </div>
    )
};

export default AddEditPieceForm;