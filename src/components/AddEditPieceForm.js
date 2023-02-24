import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';



function AddEditPieceForm(props){

    const [genreDropdownOptions, setGenreDropdownOptions] = useState(props.musicLibrary.map(p=>p.genre))
    const [createGenre, setCreateGenre] = useState(false)


    useEffect(()=>{ 
        setGenreDropdownOptions([...new Set(genreDropdownOptions)].map(genre=>{
            return <option key={genre}>{genre}</option>
        }))
    }, [props.musicLibrary, props.genre])

// Submit form for NEW piece
    function handleNewPieceSubmit(e){
        e.preventDefault();
        const newPiece = {
            title: props.title,
            composer: props.composer,
            arranger: props.arranger,
            difficulty: parseInt(props.difficulty.split('').shift()),
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
        // Resetting the form after submitting
        if(props.showArr===true){
            props.setShowArr(false)
        }
        if(props.showNotes===true){
            props.setShowNotes(false)
        }
        if(props.showRefRecord===true){
            props.setShowRefRecord(false)
        }
        if(props.editPiece===true){
            props.setEditPiece(false)
        }if(createGenre===true){
            setCreateGenre(false)
        }
        props.setTitle("")
        props.setComposer("")
        props.setArranger(null)
        props.setNotes(null)
        props.setGenre("--Select Genre--")
        props.setDifficulty("--Select Difficulty--")
        props.setNumPlayers("--Select Number of Players--")
        props.setRefRecord(null)
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
        // Resetting the form after submitting
        props.setEditPiece(false)
        props.setEditId(null)
        props.setTitle("")
        props.setComposer("")
        props.setArranger(null)
        props.setNotes(null)
        props.setGenre("--Select Genre--")
        props.setDifficulty("--Select Difficulty--")
        props.setNumPlayers("--Select Number of Players--")
        props.setRefRecord(null)
        if(props.showArr===true){
            props.setShowArr(false)
        }
        if(props.showNotes===true){
            props.setShowNotes(false)
        }
        if(props.showRefRecord===true){
            props.setShowRefRecord(false)
        }if(props.editPiece===true){
            props.setEditPiece(false)
        }if(createGenre===true){
            setCreateGenre(false)
        }
    }

    function handleGenreSelect(e){
        props.setGenre(e.target.value)
        if(e.target.value === "*Create New Genre*"){
            setCreateGenre(true)
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
                label="Reference Recording"
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
            {/* Genre Dropdown Menu */}
            <label>
            { createGenre ? <input type="text" placeholder="Enter New Genre" value={ createGenre ? null : props.genre} onChange={e=>props.setGenre(e.target.value)}/> 
                : <select value={props.genre}onChange={handleGenreSelect} name="genre">
                    <option disabled >--Select Genre--</option>
                    <option>*Create New Genre*</option>
                    {genreDropdownOptions}
                </select> }
            </label>

            {/* Buttons to include Optional Inputs */}
            {/* <label>
                <input type="checkbox" onChange={()=>props.setShowArr(!props.showArr)}checked={props.showArr}/>
                Include arranger
            </label> */}
            <Checkbox
                label="Include Arranger"
                checked={props.showArr}
                onChange={()=>props.setShowArr(!props.showArr)}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            

            <label>
                <input type="checkbox" onChange={()=>props.setShowRefRecord(!props.showRefRecord)}checked={props.showRefRecord}/>
                Include reference recording
            </label>
            <label>
                <input type="checkbox" onChange={()=>props.setShowNotes(!props.showNotes)} checked={props.showNotes}/>
                Include notes about the piece
            </label>
            <input type="submit" value="Submit" id="new-piece-submit" />
        {/* </form> */}
        </Box>
    </div>
    )
};

export default AddEditPieceForm;